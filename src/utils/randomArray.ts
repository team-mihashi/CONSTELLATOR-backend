export default (array: any, num: any) => {
  let a = array;
  let t: any[] = [];
  let r = [];
  let l = a.length;
  let n = num < l ? num : l;
  while (n-- > 0) {
    let i = Math.random() * l | 0;
    r[n] = t[i] || a[i];
    --l;
    t[i] = t[l] || a[l];
  }
  return r;
}