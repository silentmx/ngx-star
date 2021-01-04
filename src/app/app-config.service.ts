import { Injectable } from '@angular/core';
import { NgxSecurityService } from '@silentmx/ngx-star/security';

/**
 * App 全局配置服务，以及订阅数据提供者
 * @author silentmx
 */
@Injectable({
  providedIn: "root"
})
export class AppConfigService {

  constructor(
    private ngxSecurityService: NgxSecurityService
  ) {

  }

  /**
   * 初始化, 只给APP_INITIALIZER调用一次，更新配置请调用updateConfig()方法
   */
  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let conditions = {
        "AbpAccount.SettingManagement": true,
        "AbpIdentity.ClaimTypes": true,
        "AbpIdentity.ClaimTypes.Create": true,
        "AbpIdentity.ClaimTypes.Delete": true,
        "AbpIdentity.ClaimTypes.Update": true,
        "AbpIdentity.OrganizationUnits": true,
        "AbpIdentity.OrganizationUnits.ManageMembers": true,
        "AbpIdentity.OrganizationUnits.ManageOU": true,
        "AbpIdentity.OrganizationUnits.ManageRoles": true
      }
      this.ngxSecurityService.updateDataSource(conditions);
      resolve(true);
    });
  }

  updateConfig() {
    let conditions = {
      "AbpIdentity.Roles": true,
      "AbpIdentity.Roles.Create": true,
      "AbpIdentity.Roles.Delete": true,
      "AbpIdentity.Roles.ManagePermissions": true,
      "AbpIdentity.Roles.Update": true,
      "AbpIdentity.SettingManagement": true
    }
    this.ngxSecurityService.updateDataSource(conditions);
  }

}