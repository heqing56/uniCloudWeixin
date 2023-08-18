

export const errToast=(params)=> {
    uni.showToast({
        icon: "error",
        title: params,
        duration: 2000,
      });
}
export const toast=(params)=>{
    uni.$u.toast(params);
}