let routeConfig = require('./route.config');
let route = [];
for (let i in routeConfig) {
    route.push({
        path: i,
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null,routeConfig[i])
            })
        }
    });
}
module.exports = {
	routeArr:route
}