/**
 *  公共Add方法
 * 要操作的数据模型
 * 增加的条件 
 */
export const add = (model, conditions) => {
    return new Promise((resolve, reject) => {
        model.create(conditions, (err, res) => {
            if (err) {
                console.error('Erroe:' + JSON.stringify(err));
                reject(err);
                return false;
            }
            console.log('save success')
            resolve(res);
        })
    })
}


/**
 * 公共update方法
 */

export const update = (model, conditions, update, options) => {
    return new Promist((resolve, reject) => {
        model.update(conditions, update, options, (err, res) => {
            if (err) {
                console.error('Error', JSON.stringify(err));
                reject(err);
                return false;
            }
            if (res.n != 0) {
                console.log('update success')
            } else {
                console.log('update fail: no this data')
            }
            resolve(res);
        })
    })
}

/**
 * 公共remove方法
 */
export const remove = (model, conditions) => {
    return new Promise((relove, reject) => {
        model.remove(conditions, (err, res) => {
            if (err) {
                console.error('Error', JSON.stringify(err));
                reject(err);
                return false;
            }
            if (res.result.n != 0) {
                console.log('remove success');
            } else {
                console.log('remove fail : no this data')
            }

            reject(res);
        })
    })
}

/**
 * 公共find方法
 */
export const find = (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? {
        _id: -1
    } : options.sort
    delete options.sort

    return new Promist((resolve, reject) => {
        model.find(conditions, field, options, (err, res) => {
            if (err) {
                console.error('Error', JSON.stringify(err));
                reject(err);
                return false;
            }
            if (res.length != 0) {
                console.log('find successs')
            } else {
                console.log('find fail: no this data')
            }
            resolve(res)
        })
    }).sort(sort);
}

/**
 * 公共findOne方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
export const findOne = (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? {
        _id: -1
    } : options.sort;
    delete options.sort;
    return new Promise((resolve, reject) => {
        model.findOne(conditions, fields, options, function (err, res) {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            } else {
                if (res) {
                    console.log('find success!');
                } else {
                    console.log('find fail:no this data!');
                }
                resolve(res);
            }
        }).sort(sort);
    })
}


export const findPage = async (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? {
        _id: -1
    } : options.sort;

    delete options.sort;

    const getCount = () => {
        return new Promise((resolve, reject) => {
            model.find(conditions, fields).count({}, (err, res) => {
                if (err) {
                    console.log('查询长度错误')
                    return reject(err);
                }
                resolve(res)
            })
        })
    }

    const count = await getCount()

    return new Promise((resolve, reject) => {
        model.find(conditions, fields, options, (err, res) => {
            if (err) {
                console.error('Error', JSON.stringify(err));
                reject(err);
                return false;
            }

            if (res.length != 0) {
                console.log('find success')
            } else {
                console.log('find fail: no this data')
            }
            
            resolve({
                list: res,
                total: count
            })
        })
    })
}