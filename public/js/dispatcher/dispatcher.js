import { Dispatcher } from "flux";
import _ from "underscore";

export default _.extend(new Dispatcher(), {
    handleAction(action) {
        this.dispatch({
            action: action
        });
    },
});
