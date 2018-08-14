const gettes = {
    source: state => state.app.sources,

    userName: state => state.user.name,
    userList: state => state.user.list,
    userTotal: state => state.user.total,
    
}

export default getters;