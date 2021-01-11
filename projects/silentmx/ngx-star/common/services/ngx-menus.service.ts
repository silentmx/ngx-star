import { Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NgxSecurityService } from './ngx-security.service';

/**
 * 菜单接口类
 * @author silentmx
 */
export class NgxMenu {
  name: string;
  icon?: string;
  url?: string;
  level?: number;
  security?: string[];
  children?: NgxMenu[];

  constructor(data: NgxMenu) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

/**
 * 自动从路由配置获取导航菜单服务
 * @author silentmx
 */
@Injectable({
  providedIn: "root"
})
export class NgxMenusService {
  // 存放从路由配置获取的导航菜单
  ngxMenus$: BehaviorSubject<NgxMenu[]> = new BehaviorSubject<NgxMenu[]>([]);

  constructor(
    private router: Router,
    private injector: Injector,
    private ngxSecurityService: NgxSecurityService,
    @Optional() @SkipSelf() private parentService?: NgxMenusService,
  ) {
    if (parentService) {
      throw Error(
        `[NgxMenusService]: trying to create multiple instances,but this service should be a singleton.`
      );
    } else {
      this.genNgxMenuTree();
    }
  }

  /**
   * 收集菜单数据
   * @param route
   */
  private collectNgxMenuData(
    routes: Routes, 
    parentPath: string = "", 
  ): Observable<NgxMenu[]> {
    let menuList: NgxMenu[] = [];
    let childrenMenus$: Observable<NgxMenu[]>[] = [];

    for (let route of routes) {
      let routePath = route.path ? `${parentPath}/${route.path}` : parentPath;
      if (route.data && route.data.ngxMenu && !route.redirectTo) {
        menuList.push(new NgxMenu({
          ...route.data.ngxMenu,
          ...{
            url: routePath,
            security: route.data.security
          }
        }))
      }

      if (route.children && route.children.length > 0) {
        childrenMenus$.push(this.collectNgxMenuData(route.children, routePath));
      }

      if (route.loadChildren) {
        childrenMenus$.push(
          this.loadRouteConfig(route).pipe(
            switchMap(routes => {
              return this.collectNgxMenuData(routes, routePath);
            })
          )
        );
      }
    }

    return forkJoin([
      of(menuList),
      ...childrenMenus$
    ]).pipe(
      switchMap((data) => {
        return of([].concat.apply([], data));
      })
    );
  }

  /**
   * 加载lazy路由配置
   * @param route 
   */
  private loadRouteConfig(route: Route): Observable<Routes> {
    return (<any>this.router).configLoader
      .load(this.injector, route)
      .pipe(map((m: any) => m.routes));
  }

  /**
   * 生成菜单树
   */
  private genNgxMenuTree() {
    combineLatest([
      this.collectNgxMenuData(this.router.config).pipe(
        map(menus => {
          // 数据根据url去重复
          return menus.reduce((acc, item) => {
            let isExist: boolean = false;
            acc = acc.map(value => {
              if (value.url == item.url) {
                isExist = true;
                return item;
              } else {
                return value;
              }
            });
            if (!isExist) {
              acc.push(item);
            }
            return acc;
          }, [])
        })
      ),
      this.ngxSecurityService.dataSource
    ]).pipe(
      switchMap(([menus, securityMap]) => {
        // 权限过滤
        return of(menus.reduce((acc, item) => {
          // 获取权限（包括子菜单权限）
          let securitys: string[] = menus.reduce((accs, el) => {
            if (el.url.includes(item.url) && el.security && el.security.length > 0) {
              accs.push(...el.security)
            }
            return accs;
          }, []);

          // 权限判定
          if (securitys && securitys.length > 0) {
            for (let condition of securitys) {
              if (securityMap.get(condition) && securityMap.get(condition) == true) {
                acc.push(item);
              }
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, []));
      }),
      // 根据url生成菜单树
      map((menus: NgxMenu[]) => {
        let ngxMenus: NgxMenu[] = [];

        menus.forEach(item => {
          let parentMenu = this.findParentMenu(item, menus);
          if (!parentMenu) {
            item.level = 0;
            ngxMenus.push(item);
            return;
          }
          item.level = parentMenu.level + 1;
          parentMenu.children = [...(parentMenu.children || []), item];
        });

        return ngxMenus;
      })
    ).subscribe(menus => {
      this.ngxMenus$.next(menus);
    })
  }

  /**
   * 获取父节点菜单
   * @param menu
   */
  private findParentMenu(menu: NgxMenu, array: NgxMenu[]): NgxMenu {
    return array.find(item => {
      return menu.url.includes(item.url) && item.url != menu.url;
    });
  }

}