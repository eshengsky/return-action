class ReturnAction {
    constructor() {
        this.actions = {};
        this.stack = [];
        window.addEventListener('popstate', () => {
            const actionName = this.stack.pop();
            const action = this.actions[actionName];
            if (action && typeof action.popActionHandler === 'function') {
                action.popActionHandler.apply();
            }
        })
    }

    registerAction(params) {
        const { actionName, pushActionHandler, popActionHandler } = params;
        if (typeof params !== 'object' || !actionName || typeof pushActionHandler !== 'function' || typeof popActionHandler !== 'function') {
            throw new Error('Invalid params passed in registerAction function!');
        }
        this.actions[actionName] = {
            pushActionHandler,
            popActionHandler
        }
        if (location.hash.indexOf(actionName) >= 0) {
            history.replaceState(null, '', location.href.replace(actionName, ''));
        }
    }

    pushAction(actionName) {
        if (!actionName) {
            throw new Error('Invalid params passed in pushAction function!');
        }
        this.actions[actionName].pushActionHandler.apply();
        this.stack.push(actionName);

        let url = location.href;
        if (location.hash.indexOf(actionName) === -1) {
            if (!location.hash) {
                url += `#${actionName}`;
            } else {
                url += `&${actionName}`;
            }
            history.pushState({
                actionName
            }, '', url);
        }
    }

    popAction() {
        history.back();
    }
}

export default new ReturnAction();
