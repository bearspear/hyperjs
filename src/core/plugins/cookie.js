import { Cookies } from '../../services/cookie'

export default function cookie(core) {
  const cookies = new Cookies();
  core.cookies = cookies;
  return {
    init: function (sb) {
      sb.getCookie = cookies.getItem;
      return sb.hasCookie = cookies.hasItem;
    }
  };
};