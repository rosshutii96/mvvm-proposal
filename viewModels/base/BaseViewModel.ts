import { action, computed, makeObservable, observable, set } from "mobx";

export class BaseViewModel<T extends object> {
  protected originalModel: T;

  @observable.deep
  protected model: T;

  @observable
  private _isDraft: boolean = false;

  constructor(model: T) {
    makeObservable(this);
    this.originalModel = model;
    this.model = observable(model);
    this._isDraft = false;
  }

  @action
  public updateViewModel(newModel: T) {
    this.originalModel = newModel;
    set(this.model, newModel);
    this._isDraft = false;
  }

  @action
  public submitOptimisticUpdate() {
    this.originalModel = this.model;
    this._isDraft = false;
  }

  @action
  public optimisticUpdate(newModel: Partial<T>) {
    set(this.model, {...this.model, ...newModel});
    this._isDraft = true;
  }

  @action
  public revertOptimisticUpdate() {
    this.model = observable(this.originalModel);
    this._isDraft = false;
  }

  @computed
  public get isDraft(): boolean {
    return this._isDraft;
  }
}
