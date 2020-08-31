import Cookies from 'js-cookie'
const TokenKey='User-Cookie';
const NameKey='User-Name';
const AvatarKey='User-Avatar';

export default {
  setUser(token,name,avatar){
    Cookies.set(TokenKey,token);
    Cookies.set(NameKey,name);
    Cookies.set(AvatarKey,avatar);
  },
  getUser(){
    return {
      token: Cookies.get(TokenKey),
      name: Cookies.get(NameKey),
      avatar: Cookies.get(AvatarKey)
    }
  },
  removeUser(){
    Cookies.remove(TokenKey);
    Cookies.remove(NameKey);
    Cookies.remove(AvatarKey);
  }
}
