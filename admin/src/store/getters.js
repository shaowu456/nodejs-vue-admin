const getters = {
  roles: state => state.user.roles,
  logininfo: state => state.user.logininfo, // 用户的信息都在这里了
  partitionBywarehouse: state => state.basedata.partitionBywarehouse
}
export default getters
