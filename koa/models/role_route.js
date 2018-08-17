import db from '../mongodb'
let RoleRouteSchema = db.Schema({
    title: Array,
    path: String,
    icon: String,
    IsParentNode: Boolean,
    ParentNode: String,
    Roles: String,
    CreateBy: String,
    CreateDate: { type: Date, default: Date.now},
    ModifiedBy: String,
    ModifiedDate: { type: Date, default: Date.now},
})
export default db.model('Role_Router', RoleRouteSchema)