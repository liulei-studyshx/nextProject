import { observable, action, makeObservable } from 'mobx';

export default class Mark {
    markingLoading = false;
    constructor() {
        makeObservable(this, {
            markingLoading: observable,
            setMarkingLoading: action,
        });
    }

    setMarkingLoading = (value) => {
        this.markingLoading = value;
    }
    
}