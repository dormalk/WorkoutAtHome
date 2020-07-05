
export const localStorageMiddleWare = (store:any) => (next:any) => (action:any) => {
    // const rootStore:RootState = store.getState();
    // keepChangesOnLocalStorage(rootStore.virtualroomstate);
    let result = next(action)
    return result
  }