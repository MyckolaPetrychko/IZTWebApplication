/**
 * @author Maryna Usatiuk
 * @email maryna.duda@innovinnprom.com
 * @date 05.08.2016 09:50:59
 */
"use strict";
/**
 * USER_ROLES_VALUES - values of users roles and action:
 *      root - settings of system : root
 *      admin - configure users roles : root, admin
 *      employee - work as IZT employee : root, admin, employee
 *      trader - work as trader : root, trader,
 *      user - work as auth user: root, trader, employee, user
 *      public - not paroled actions: all + anonym
 */
exports.USER_ROLES = {
    root: ['root'],
    admin: ['root', 'admin'],
    employee: ['root', 'admin', 'employee', 'user'],
    trader: ['root', 'trader', 'user'],
    user: ['root', 'admin', 'employee', 'trader', 'user'],
    public: ['root', 'admin', 'employee', 'trader', 'user', 'anonym']
};
/**
 * Token for user roles
 */
// export let USER_ROLES_ = new OpaqueToken('user-roles-token');
/**
 * Provider
 */
// export let UserRolesProvide = { provide: USER_ROLES, useValue: USER_ROLES_VALUES};

//# sourceMappingURL=user-roles.model.js.map
