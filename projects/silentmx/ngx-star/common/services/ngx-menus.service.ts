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
  private ngxMenus$: BehaviorSubject<NgxMenu[]> = new BehaviorSubject<NgxMenu[]>([]);

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
      this.collectNgxMenuData(this.router.config).pipe(
        map((menus: NgxMenu[]) => {
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
      ).subscribe((menus: NgxMenu[]) => {
        this.ngxMenus$.next(menus);
      });
    }
  }

  /**
   * 获取菜单树
   * @publicApi
   */
  getNgxMenuTree(): Observable<NgxMenu[]> {
    return combineLatest([
      this.ngxMenus$,
      this.ngxSecurityService.dataSource
    ]).pipe(
      // 权限过滤
      switchMap(([menus, securityMap]) => {
        let scurityMenus: NgxMenu[] = [];
        scurityMenus = menus.reduce((acc, menu) => {
          // 获取权限（包括子菜单权限）
          let securitys: string[] = menus.reduce((accs, el) => {
            if (el.url == menu.url || el.url.startsWith(menu.url + "/")) {
              if (el.security && el.security.length > 0) {
                accs.push(...el.security);
              }
            }
            return accs;
          }, []);

          // 权限判定
          if (securitys && securitys.length > 0) {
            for (let condition of securitys) {
              if (securityMap.get(condition) && securityMap.get(condition) == true) {
                acc.push(new NgxMenu(menu));
                return acc;
              }
            }
          } else {
            acc.push(new NgxMenu(menu));
          }

          return acc;
        }, []);

        return of(scurityMenus);
      }),
      // 根据url生成菜单树
      map((scurityMenus: NgxMenu[]) => {
        let ngxMenusTree: NgxMenu[] = [];

        scurityMenus.forEach(menu => {
          let parentMenu = this.findParentMenu(menu, scurityMenus);
          if (!parentMenu) {
            menu.level = 0
            ngxMenusTree.push(menu);
          } else {
            menu.level = parentMenu.level + 1;
            parentMenu.children = [...(parentMenu.children || []), menu];
          }
        });
        return ngxMenusTree;
      })
    )
  }

  /**
   * 收集菜单数据
   * @param route
   */
  private collectNgxMenuData(
    routes: Routes,
    parentPath: string = "",
  ): Observable<NgxMenu[]> {
    let menus$: Observable<NgxMenu[]>[] = [];
    for (let route of routes) {
      let routePath = route.path ? `${parentPath}/${route.path}` : parentPath;
      if (route.data && route.data.ngxMenu && !route.redirectTo) {
        menus$.push(of([
          new NgxMenu({
            ...route.data.ngxMenu,
            ...{
              url: routePath,
              security: route.data.security
            }
          })
        ]));
      }

      if (route.children && route.children.length > 0) {
        menus$.push(this.collectNgxMenuData(route.children, routePath));
      }

      if (route.loadChildren) {
        menus$.push(
          this.loadRouteConfig(route).pipe(
            switchMap(routes => {
              return this.collectNgxMenuData(routes, routePath);
            })
          )
        );
      }
    }

    return forkJoin([
      of([]),
      ...menus$
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
   * 获取父节点菜单
   * @param menu
   */
  private findParentMenu(menu: NgxMenu, array: NgxMenu[]): NgxMenu {
    let parent: NgxMenu;

    array.forEach(item => {
      if (menu.url.startsWith(item.url + "/") && item.url !== menu.url) {
        if (!parent) {
          parent = item;
        }

        if (item.url.length > parent.url.length) {
          parent = item;
        }
      }
    });

    return parent;
  }

}