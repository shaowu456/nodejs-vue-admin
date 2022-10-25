export default store => {
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutation, state) => { // 每次提交mutation 都会进来
    localStorage.state = JSON.stringify(state)
  })
}
