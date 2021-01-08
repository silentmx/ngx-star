import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
@Injectable()
export class NgxMenusService implements OnDestroy {
  // 存放从路由配置获取的导航菜单
  ngxMenus$: BehaviorSubject<NgxMenu[]> = new BehaviorSubject<NgxMenu[]>([]);

  // 用来存放从路由配置获取的原生菜单数据;
  private ngxMenus: NgxMenu[] = [];

  private readonly internalMenuChanges = new Subject<void>();

  constructor(
    private router: Router,
    private injector: Injector,
    private ngxSecurityService: NgxSecurityService
  ) {
    this.collectNgxMenuData();
    this.genNgxMenuTree();
  }

  ngOnDestroy() {
    this.internalMenuChanges.complete();
  }

  /**
   * 收集菜单数据
   * @param routes
   */
  private collectNgxMenuData(
    routes: Routes = this.router.config,
    parentPath: string = "",
  ) {
    routes.map(route => {
      let routePath = route.path ? `${parentPath}/${route.path}` : parentPath;
      if (route.data && route.data.ngxMenu && !route.redirectTo) {
        let menu: NgxMenu = new NgxMenu({
          ...route.data.ngxMenu,
          ...{
            url: routePath,
            security: route.data.security
          }
        });

        if (!this.findExistMenu(menu)) {
          this.ngxMenus.push(menu);
          this.internalMenuChanges.next();
        }
      }

      if (route.children && route.children.length > 0) {
        this.collectNgxMenuData(route.children, routePath);
      }

      if (route.loadChildren) {
        (<any>this.router).configLoader.load(this.injector, route)
          .subscribe((moduleConf) => {
            this.collectNgxMenuData(moduleConf.routes, routePath);
          });
      }
    })
  }

  /**
   * 生成菜单树
   */
  private genNgxMenuTree() {
    combineLatest([
      this.internalMenuChanges,
      this.ngxSecurityService.dataSource
    ]).pipe(
      switchMap(([_, securityMap]) => {
        const menus: NgxMenu[] = [];

        // 根据权限获取菜单List
        const securityMenus = this.ngxMenus.reduce((acc, el) => {
          let securitys: string[] = this.getMenuSecurity(el);
          if (securitys && securitys.length > 0) {
            for (let condition of securitys) {
              if (securityMap.get(condition) && securityMap.get(condition) == true) {
                acc.push(new NgxMenu(el));
              }
            }
          } else {
            acc.push(new NgxMenu(el));
          }
          return acc;
        }, []);

        // 生成菜单结构树
        securityMenus.forEach(el => {
          if (!this.findParentMenu(el, securityMenus)) {
            el.level = 0;
            menus.push(el);
            return;
          }
          const parentEl = this.findParentMenu(el, securityMenus);
          el.level = parentEl.level + 1;
          parentEl.children = [...(parentEl.children || []), el];
        });

        return of(menus);
      })
    ).subscribe(menus => {
      this.ngxMenus$.next(menus);
    })
  }

  /**
   * 获取菜单及子菜单权限
   */
  private getMenuSecurity(menu: NgxMenu): string[] {
    let securitys: string[] = [];
    this.ngxMenus.map(item => {
      if (item.url.includes(menu.url)) {
        if (item.security && item.security.length > 0) {
          securitys.push(...item.security);
        }
      }
    });
    return securitys;
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

  /**
   * 获取已存在的菜单
   */
  private findExistMenu(menu: NgxMenu): boolean {
    let existMenu = this.ngxMenus.find(item => {
      return menu.url == item.url;
    });

    if (existMenu) {
      return true;
    } else {
      return false;
    }
  }

}