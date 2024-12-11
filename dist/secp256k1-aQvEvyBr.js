import { H as ee, h as ne, t as re, e as Zt, b as oe, r as ie, c as se, s as ce } from "./main-Bqg7dCYT.js";
class Kt extends ee {
  constructor(n, t) {
    super(), this.finished = !1, this.destroyed = !1, ne(n);
    const r = re(t);
    if (this.iHash = n.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, o = new Uint8Array(s);
    o.set(r.length > s ? n.create().update(r).digest() : r);
    for (let a = 0; a < o.length; a++)
      o[a] ^= 54;
    this.iHash.update(o), this.oHash = n.create();
    for (let a = 0; a < o.length; a++)
      o[a] ^= 106;
    this.oHash.update(o), o.fill(0);
  }
  update(n) {
    return Zt(this), this.iHash.update(n), this;
  }
  digestInto(n) {
    Zt(this), oe(n, this.outputLen), this.finished = !0, this.iHash.digestInto(n), this.oHash.update(n), this.oHash.digestInto(n), this.destroy();
  }
  digest() {
    const n = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(n), n;
  }
  _cloneInto(n) {
    n || (n = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: r, finished: s, destroyed: o, blockLen: a, outputLen: f } = this;
    return n = n, n.finished = s, n.destroyed = o, n.blockLen = a, n.outputLen = f, n.oHash = t._cloneInto(n.oHash), n.iHash = r._cloneInto(n.iHash), n;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Pt = (e, n, t) => new Kt(e, n).update(t).digest();
Pt.create = (e, n) => new Kt(e, n);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const qt = /* @__PURE__ */ BigInt(0), wt = /* @__PURE__ */ BigInt(1), fe = /* @__PURE__ */ BigInt(2);
function nt(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function ht(e) {
  if (!nt(e))
    throw new Error("Uint8Array expected");
}
function ct(e, n) {
  if (typeof n != "boolean")
    throw new Error(`${e} must be valid boolean, got "${n}".`);
}
const ae = /* @__PURE__ */ Array.from({ length: 256 }, (e, n) => n.toString(16).padStart(2, "0"));
function ft(e) {
  ht(e);
  let n = "";
  for (let t = 0; t < e.length; t++)
    n += ae[e[t]];
  return n;
}
function st(e) {
  const n = e.toString(16);
  return n.length & 1 ? `0${n}` : n;
}
function Ot(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return BigInt(e === "" ? "0" : `0x${e}`);
}
const P = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Rt(e) {
  if (e >= P._0 && e <= P._9)
    return e - P._0;
  if (e >= P._A && e <= P._F)
    return e - (P._A - 10);
  if (e >= P._a && e <= P._f)
    return e - (P._a - 10);
}
function at(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const n = e.length, t = n / 2;
  if (n % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + n);
  const r = new Uint8Array(t);
  for (let s = 0, o = 0; s < t; s++, o += 2) {
    const a = Rt(e.charCodeAt(o)), f = Rt(e.charCodeAt(o + 1));
    if (a === void 0 || f === void 0) {
      const i = e[o] + e[o + 1];
      throw new Error('hex string expected, got non-hex character "' + i + '" at index ' + o);
    }
    r[s] = a * 16 + f;
  }
  return r;
}
function tt(e) {
  return Ot(ft(e));
}
function Nt(e) {
  return ht(e), Ot(ft(Uint8Array.from(e).reverse()));
}
function lt(e, n) {
  return at(e.toString(16).padStart(n * 2, "0"));
}
function $t(e, n) {
  return lt(e, n).reverse();
}
function le(e) {
  return at(st(e));
}
function K(e, n, t) {
  let r;
  if (typeof n == "string")
    try {
      r = at(n);
    } catch (o) {
      throw new Error(`${e} must be valid hex string, got "${n}". Cause: ${o}`);
    }
  else if (nt(n))
    r = Uint8Array.from(n);
  else
    throw new Error(`${e} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof t == "number" && s !== t)
    throw new Error(`${e} expected ${t} bytes, got ${s}`);
  return r;
}
function dt(...e) {
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    ht(s), n += s.length;
  }
  const t = new Uint8Array(n);
  for (let r = 0, s = 0; r < e.length; r++) {
    const o = e[r];
    t.set(o, s), s += o.length;
  }
  return t;
}
function ue(e, n) {
  if (e.length !== n.length)
    return !1;
  let t = 0;
  for (let r = 0; r < e.length; r++)
    t |= e[r] ^ n[r];
  return t === 0;
}
function de(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
const mt = (e) => typeof e == "bigint" && qt <= e;
function yt(e, n, t) {
  return mt(e) && mt(n) && mt(t) && n <= e && e < t;
}
function et(e, n, t, r) {
  if (!yt(n, t, r))
    throw new Error(`expected valid ${e}: ${t} <= n < ${r}, got ${typeof n} ${n}`);
}
function Ft(e) {
  let n;
  for (n = 0; e > qt; e >>= wt, n += 1)
    ;
  return n;
}
function he(e, n) {
  return e >> BigInt(n) & wt;
}
function ge(e, n, t) {
  return e | (t ? wt : qt) << BigInt(n);
}
const Lt = (e) => (fe << BigInt(e - 1)) - wt, bt = (e) => new Uint8Array(e), zt = (e) => Uint8Array.from(e);
function Gt(e, n, t) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof n != "number" || n < 2)
    throw new Error("qByteLen must be a number");
  if (typeof t != "function")
    throw new Error("hmacFn must be a function");
  let r = bt(e), s = bt(e), o = 0;
  const a = () => {
    r.fill(1), s.fill(0), o = 0;
  }, f = (...E) => t(s, r, ...E), i = (E = bt()) => {
    s = f(zt([0]), E), r = f(), E.length !== 0 && (s = f(zt([1]), E), r = f());
  }, l = () => {
    if (o++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let E = 0;
    const u = [];
    for (; E < n; ) {
      r = f();
      const q = r.slice();
      u.push(q), E += r.length;
    }
    return dt(...u);
  };
  return (E, u) => {
    a(), i(E);
    let q;
    for (; !(q = u(l())); )
      i();
    return a(), q;
  };
}
const we = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || nt(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, n) => n.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen)
};
function gt(e, n, t = {}) {
  const r = (s, o, a) => {
    const f = we[o];
    if (typeof f != "function")
      throw new Error(`Invalid validator "${o}", expected function`);
    const i = e[s];
    if (!(a && i === void 0) && !f(i, e))
      throw new Error(`Invalid param ${String(s)}=${i} (${typeof i}), expected ${o}`);
  };
  for (const [s, o] of Object.entries(n))
    r(s, o, !1);
  for (const [s, o] of Object.entries(t))
    r(s, o, !0);
  return e;
}
const ye = () => {
  throw new Error("not implemented");
};
function vt(e) {
  const n = /* @__PURE__ */ new WeakMap();
  return (t, ...r) => {
    const s = n.get(t);
    if (s !== void 0)
      return s;
    const o = e(t, ...r);
    return n.set(t, o), o;
  };
}
const pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: et,
  abool: ct,
  abytes: ht,
  bitGet: he,
  bitLen: Ft,
  bitMask: Lt,
  bitSet: ge,
  bytesToHex: ft,
  bytesToNumberBE: tt,
  bytesToNumberLE: Nt,
  concatBytes: dt,
  createHmacDrbg: Gt,
  ensureBytes: K,
  equalBytes: ue,
  hexToBytes: at,
  hexToNumber: Ot,
  inRange: yt,
  isBytes: nt,
  memoized: vt,
  notImplemented: ye,
  numberToBytesBE: lt,
  numberToBytesLE: $t,
  numberToHexUnpadded: st,
  numberToVarBytesBE: le,
  utf8ToBytes: de,
  validateObject: gt
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const R = BigInt(0), _ = BigInt(1), J = BigInt(2), me = BigInt(3), xt = BigInt(4), kt = BigInt(5), Ut = BigInt(8);
BigInt(9);
BigInt(16);
function U(e, n) {
  const t = e % n;
  return t >= R ? t : n + t;
}
function be(e, n, t) {
  if (t <= R || n < R)
    throw new Error("Expected power/modulo > 0");
  if (t === _)
    return R;
  let r = _;
  for (; n > R; )
    n & _ && (r = r * e % t), e = e * e % t, n >>= _;
  return r;
}
function V(e, n, t) {
  let r = e;
  for (; n-- > R; )
    r *= r, r %= t;
  return r;
}
function St(e, n) {
  if (e === R || n <= R)
    throw new Error(`invert: expected positive integers, got n=${e} mod=${n}`);
  let t = U(e, n), r = n, s = R, o = _;
  for (; t !== R; ) {
    const f = r / t, i = r % t, l = s - o * f;
    r = t, t = i, s = o, o = l;
  }
  if (r !== _)
    throw new Error("invert: does not exist");
  return U(s, n);
}
function Ee(e) {
  const n = (e - _) / J;
  let t, r, s;
  for (t = e - _, r = 0; t % J === R; t /= J, r++)
    ;
  for (s = J; s < e && be(s, n, e) !== e - _; s++)
    ;
  if (r === 1) {
    const a = (e + _) / xt;
    return function(i, l) {
      const m = i.pow(l, a);
      if (!i.eql(i.sqr(m), l))
        throw new Error("Cannot find square root");
      return m;
    };
  }
  const o = (t + _) / J;
  return function(f, i) {
    if (f.pow(i, n) === f.neg(f.ONE))
      throw new Error("Cannot find square root");
    let l = r, m = f.pow(f.mul(f.ONE, s), t), E = f.pow(i, o), u = f.pow(i, t);
    for (; !f.eql(u, f.ONE); ) {
      if (f.eql(u, f.ZERO))
        return f.ZERO;
      let q = 1;
      for (let p = f.sqr(u); q < l && !f.eql(p, f.ONE); q++)
        p = f.sqr(p);
      const T = f.pow(m, _ << BigInt(l - q - 1));
      m = f.sqr(T), E = f.mul(E, T), u = f.mul(u, m), l = q;
    }
    return E;
  };
}
function Be(e) {
  if (e % xt === me) {
    const n = (e + _) / xt;
    return function(r, s) {
      const o = r.pow(s, n);
      if (!r.eql(r.sqr(o), s))
        throw new Error("Cannot find square root");
      return o;
    };
  }
  if (e % Ut === kt) {
    const n = (e - kt) / Ut;
    return function(r, s) {
      const o = r.mul(s, J), a = r.pow(o, n), f = r.mul(s, a), i = r.mul(r.mul(f, J), a), l = r.mul(f, r.sub(i, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return Ee(e);
}
const ve = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function xe(e) {
  const n = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, t = ve.reduce((r, s) => (r[s] = "function", r), n);
  return gt(e, t);
}
function Se(e, n, t) {
  if (t < R)
    throw new Error("Expected power > 0");
  if (t === R)
    return e.ONE;
  if (t === _)
    return n;
  let r = e.ONE, s = n;
  for (; t > R; )
    t & _ && (r = e.mul(r, s)), s = e.sqr(s), t >>= _;
  return r;
}
function Ie(e, n) {
  const t = new Array(n.length), r = n.reduce((o, a, f) => e.is0(a) ? o : (t[f] = o, e.mul(o, a)), e.ONE), s = e.inv(r);
  return n.reduceRight((o, a, f) => e.is0(a) ? o : (t[f] = e.mul(o, t[f]), e.mul(o, a)), s), t;
}
function Wt(e, n) {
  const t = n !== void 0 ? n : e.toString(2).length, r = Math.ceil(t / 8);
  return { nBitLength: t, nByteLength: r };
}
function Xt(e, n, t = !1, r = {}) {
  if (e <= R)
    throw new Error(`Expected Field ORDER > 0, got ${e}`);
  const { nBitLength: s, nByteLength: o } = Wt(e, n);
  if (o > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const a = Be(e), f = Object.freeze({
    ORDER: e,
    BITS: s,
    BYTES: o,
    MASK: Lt(s),
    ZERO: R,
    ONE: _,
    create: (i) => U(i, e),
    isValid: (i) => {
      if (typeof i != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof i}`);
      return R <= i && i < e;
    },
    is0: (i) => i === R,
    isOdd: (i) => (i & _) === _,
    neg: (i) => U(-i, e),
    eql: (i, l) => i === l,
    sqr: (i) => U(i * i, e),
    add: (i, l) => U(i + l, e),
    sub: (i, l) => U(i - l, e),
    mul: (i, l) => U(i * l, e),
    pow: (i, l) => Se(f, i, l),
    div: (i, l) => U(i * St(l, e), e),
    // Same as above, but doesn't normalize
    sqrN: (i) => i * i,
    addN: (i, l) => i + l,
    subN: (i, l) => i - l,
    mulN: (i, l) => i * l,
    inv: (i) => St(i, e),
    sqrt: r.sqrt || ((i) => a(f, i)),
    invertBatch: (i) => Ie(f, i),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (i, l, m) => m ? l : i,
    toBytes: (i) => t ? $t(i, o) : lt(i, o),
    fromBytes: (i) => {
      if (i.length !== o)
        throw new Error(`Fp.fromBytes: expected ${o}, got ${i.length}`);
      return t ? Nt(i) : tt(i);
    }
  });
  return Object.freeze(f);
}
function Dt(e) {
  if (typeof e != "bigint")
    throw new Error("field order must be bigint");
  const n = e.toString(2).length;
  return Math.ceil(n / 8);
}
function Qt(e) {
  const n = Dt(e);
  return n + Math.ceil(n / 2);
}
function Ae(e, n, t = !1) {
  const r = e.length, s = Dt(n), o = Qt(n);
  if (r < 16 || r < o || r > 1024)
    throw new Error(`expected ${o}-1024 bytes of input, got ${r}`);
  const a = t ? tt(e) : Nt(e), f = U(a, n - _) + _;
  return t ? $t(f, s) : lt(f, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const qe = BigInt(0), Et = BigInt(1), Bt = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap();
function Oe(e, n) {
  const t = (o, a) => {
    const f = a.negate();
    return o ? f : a;
  }, r = (o) => {
    if (!Number.isSafeInteger(o) || o <= 0 || o > n)
      throw new Error(`Wrong window size=${o}, should be [1..${n}]`);
  }, s = (o) => {
    r(o);
    const a = Math.ceil(n / o) + 1, f = 2 ** (o - 1);
    return { windows: a, windowSize: f };
  };
  return {
    constTimeNegate: t,
    // non-const time multiplication ladder
    unsafeLadder(o, a) {
      let f = e.ZERO, i = o;
      for (; a > qe; )
        a & Et && (f = f.add(i)), i = i.double(), a >>= Et;
      return f;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(o, a) {
      const { windows: f, windowSize: i } = s(a), l = [];
      let m = o, E = m;
      for (let u = 0; u < f; u++) {
        E = m, l.push(E);
        for (let q = 1; q < i; q++)
          E = E.add(m), l.push(E);
        m = E.double();
      }
      return l;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(o, a, f) {
      const { windows: i, windowSize: l } = s(o);
      let m = e.ZERO, E = e.BASE;
      const u = BigInt(2 ** o - 1), q = 2 ** o, T = BigInt(o);
      for (let p = 0; p < i; p++) {
        const c = p * l;
        let h = Number(f & u);
        f >>= T, h > l && (h -= q, f += Et);
        const y = c, B = c + Math.abs(h) - 1, x = p % 2 !== 0, O = h < 0;
        h === 0 ? E = E.add(t(x, a[y])) : m = m.add(t(O, a[B]));
      }
      return { p: m, f: E };
    },
    wNAFCached(o, a, f) {
      const i = Ct.get(o) || 1;
      let l = Bt.get(o);
      return l || (l = this.precomputeWindow(o, i), i !== 1 && Bt.set(o, f(l))), this.wNAF(i, l, a);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(o, a) {
      r(a), Ct.set(o, a), Bt.delete(o);
    }
  };
}
function Ne(e, n, t, r) {
  if (!Array.isArray(t) || !Array.isArray(r) || r.length !== t.length)
    throw new Error("arrays of points and scalars must have equal length");
  r.forEach((m, E) => {
    if (!n.isValid(m))
      throw new Error(`wrong scalar at index ${E}`);
  }), t.forEach((m, E) => {
    if (!(m instanceof e))
      throw new Error(`wrong point at index ${E}`);
  });
  const s = Ft(BigInt(t.length)), o = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, a = (1 << o) - 1, f = new Array(a + 1).fill(e.ZERO), i = Math.floor((n.BITS - 1) / o) * o;
  let l = e.ZERO;
  for (let m = i; m >= 0; m -= o) {
    f.fill(e.ZERO);
    for (let u = 0; u < r.length; u++) {
      const q = r[u], T = Number(q >> BigInt(m) & BigInt(a));
      f[T] = f[T].add(t[u]);
    }
    let E = e.ZERO;
    for (let u = f.length - 1, q = e.ZERO; u > 0; u--)
      q = q.add(f[u]), E = E.add(q);
    if (l = l.add(E), m !== 0)
      for (let u = 0; u < o; u++)
        l = l.double();
  }
  return l;
}
function Jt(e) {
  return xe(e.Fp), gt(e, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Wt(e.n, e.nBitLength),
    ...e,
    p: e.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function jt(e) {
  e.lowS !== void 0 && ct("lowS", e.lowS), e.prehash !== void 0 && ct("prehash", e.prehash);
}
function $e(e) {
  const n = Jt(e);
  gt(n, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: t, Fp: r, a: s } = n;
  if (t) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof t != "object" || typeof t.beta != "bigint" || typeof t.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...n });
}
const { bytesToNumberBE: Le, hexToBytes: _e } = pe, F = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(n = "") {
      super(n);
    }
  },
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (e, n) => {
      const { Err: t } = F;
      if (e < 0 || e > 256)
        throw new t("tlv.encode: wrong tag");
      if (n.length & 1)
        throw new t("tlv.encode: unpadded data");
      const r = n.length / 2, s = st(r);
      if (s.length / 2 & 128)
        throw new t("tlv.encode: long form length too big");
      const o = r > 127 ? st(s.length / 2 | 128) : "";
      return `${st(e)}${o}${s}${n}`;
    },
    // v - value, l - left bytes (unparsed)
    decode(e, n) {
      const { Err: t } = F;
      let r = 0;
      if (e < 0 || e > 256)
        throw new t("tlv.encode: wrong tag");
      if (n.length < 2 || n[r++] !== e)
        throw new t("tlv.decode: wrong tlv");
      const s = n[r++], o = !!(s & 128);
      let a = 0;
      if (!o)
        a = s;
      else {
        const i = s & 127;
        if (!i)
          throw new t("tlv.decode(long): indefinite length not supported");
        if (i > 4)
          throw new t("tlv.decode(long): byte length is too big");
        const l = n.subarray(r, r + i);
        if (l.length !== i)
          throw new t("tlv.decode: length bytes not complete");
        if (l[0] === 0)
          throw new t("tlv.decode(long): zero leftmost byte");
        for (const m of l)
          a = a << 8 | m;
        if (r += i, a < 128)
          throw new t("tlv.decode(long): not minimal encoding");
      }
      const f = n.subarray(r, r + a);
      if (f.length !== a)
        throw new t("tlv.decode: wrong value length");
      return { v: f, l: n.subarray(r + a) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(e) {
      const { Err: n } = F;
      if (e < G)
        throw new n("integer: negative integers are not allowed");
      let t = st(e);
      if (Number.parseInt(t[0], 16) & 8 && (t = "00" + t), t.length & 1)
        throw new n("unexpected assertion");
      return t;
    },
    decode(e) {
      const { Err: n } = F;
      if (e[0] & 128)
        throw new n("Invalid signature integer: negative");
      if (e[0] === 0 && !(e[1] & 128))
        throw new n("Invalid signature integer: unnecessary leading zero");
      return Le(e);
    }
  },
  toSig(e) {
    const { Err: n, _int: t, _tlv: r } = F, s = typeof e == "string" ? _e(e) : e;
    ht(s);
    const { v: o, l: a } = r.decode(48, s);
    if (a.length)
      throw new n("Invalid signature: left bytes after parsing");
    const { v: f, l: i } = r.decode(2, o), { v: l, l: m } = r.decode(2, i);
    if (m.length)
      throw new n("Invalid signature: left bytes after parsing");
    return { r: t.decode(f), s: t.decode(l) };
  },
  hexFromSig(e) {
    const { _tlv: n, _int: t } = F, r = `${n.encode(2, t.encode(e.r))}${n.encode(2, t.encode(e.s))}`;
    return n.encode(48, r);
  }
}, G = BigInt(0), Z = BigInt(1);
BigInt(2);
const Vt = BigInt(3);
BigInt(4);
function Te(e) {
  const n = $e(e), { Fp: t } = n, r = Xt(n.n, n.nBitLength), s = n.toBytes || ((p, c, h) => {
    const y = c.toAffine();
    return dt(Uint8Array.from([4]), t.toBytes(y.x), t.toBytes(y.y));
  }), o = n.fromBytes || ((p) => {
    const c = p.subarray(1), h = t.fromBytes(c.subarray(0, t.BYTES)), y = t.fromBytes(c.subarray(t.BYTES, 2 * t.BYTES));
    return { x: h, y };
  });
  function a(p) {
    const { a: c, b: h } = n, y = t.sqr(p), B = t.mul(y, p);
    return t.add(t.add(B, t.mul(p, c)), h);
  }
  if (!t.eql(t.sqr(n.Gy), a(n.Gx)))
    throw new Error("bad generator point: equation left != right");
  function f(p) {
    return yt(p, Z, n.n);
  }
  function i(p) {
    const { allowedPrivateKeyLengths: c, nByteLength: h, wrapPrivateKey: y, n: B } = n;
    if (c && typeof p != "bigint") {
      if (nt(p) && (p = ft(p)), typeof p != "string" || !c.includes(p.length))
        throw new Error("Invalid key");
      p = p.padStart(h * 2, "0");
    }
    let x;
    try {
      x = typeof p == "bigint" ? p : tt(K("private key", p, h));
    } catch {
      throw new Error(`private key must be ${h} bytes, hex or bigint, not ${typeof p}`);
    }
    return y && (x = U(x, B)), et("private key", x, Z, B), x;
  }
  function l(p) {
    if (!(p instanceof u))
      throw new Error("ProjectivePoint expected");
  }
  const m = vt((p, c) => {
    const { px: h, py: y, pz: B } = p;
    if (t.eql(B, t.ONE))
      return { x: h, y };
    const x = p.is0();
    c == null && (c = x ? t.ONE : t.inv(B));
    const O = t.mul(h, c), S = t.mul(y, c), b = t.mul(B, c);
    if (x)
      return { x: t.ZERO, y: t.ZERO };
    if (!t.eql(b, t.ONE))
      throw new Error("invZ was invalid");
    return { x: O, y: S };
  }), E = vt((p) => {
    if (p.is0()) {
      if (n.allowInfinityPoint && !t.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: c, y: h } = p.toAffine();
    if (!t.isValid(c) || !t.isValid(h))
      throw new Error("bad point: x or y not FE");
    const y = t.sqr(h), B = a(c);
    if (!t.eql(y, B))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class u {
    constructor(c, h, y) {
      if (this.px = c, this.py = h, this.pz = y, c == null || !t.isValid(c))
        throw new Error("x required");
      if (h == null || !t.isValid(h))
        throw new Error("y required");
      if (y == null || !t.isValid(y))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(c) {
      const { x: h, y } = c || {};
      if (!c || !t.isValid(h) || !t.isValid(y))
        throw new Error("invalid affine point");
      if (c instanceof u)
        throw new Error("projective point not allowed");
      const B = (x) => t.eql(x, t.ZERO);
      return B(h) && B(y) ? u.ZERO : new u(h, y, t.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(c) {
      const h = t.invertBatch(c.map((y) => y.pz));
      return c.map((y, B) => y.toAffine(h[B])).map(u.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(c) {
      const h = u.fromAffine(o(K("pointHex", c)));
      return h.assertValidity(), h;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(c) {
      return u.BASE.multiply(i(c));
    }
    // Multiscalar Multiplication
    static msm(c, h) {
      return Ne(u, r, c, h);
    }
    // "Private method", don't use it directly
    _setWindowSize(c) {
      T.setWindowSize(this, c);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      E(this);
    }
    hasEvenY() {
      const { y: c } = this.toAffine();
      if (t.isOdd)
        return !t.isOdd(c);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(c) {
      l(c);
      const { px: h, py: y, pz: B } = this, { px: x, py: O, pz: S } = c, b = t.eql(t.mul(h, S), t.mul(x, B)), v = t.eql(t.mul(y, S), t.mul(O, B));
      return b && v;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new u(this.px, t.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: c, b: h } = n, y = t.mul(h, Vt), { px: B, py: x, pz: O } = this;
      let S = t.ZERO, b = t.ZERO, v = t.ZERO, A = t.mul(B, B), j = t.mul(x, x), L = t.mul(O, O), N = t.mul(B, x);
      return N = t.add(N, N), v = t.mul(B, O), v = t.add(v, v), S = t.mul(c, v), b = t.mul(y, L), b = t.add(S, b), S = t.sub(j, b), b = t.add(j, b), b = t.mul(S, b), S = t.mul(N, S), v = t.mul(y, v), L = t.mul(c, L), N = t.sub(A, L), N = t.mul(c, N), N = t.add(N, v), v = t.add(A, A), A = t.add(v, A), A = t.add(A, L), A = t.mul(A, N), b = t.add(b, A), L = t.mul(x, O), L = t.add(L, L), A = t.mul(L, N), S = t.sub(S, A), v = t.mul(L, j), v = t.add(v, v), v = t.add(v, v), new u(S, b, v);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(c) {
      l(c);
      const { px: h, py: y, pz: B } = this, { px: x, py: O, pz: S } = c;
      let b = t.ZERO, v = t.ZERO, A = t.ZERO;
      const j = n.a, L = t.mul(n.b, Vt);
      let N = t.mul(h, x), C = t.mul(y, O), d = t.mul(B, S), g = t.add(h, y), w = t.add(x, O);
      g = t.mul(g, w), w = t.add(N, C), g = t.sub(g, w), w = t.add(h, B);
      let I = t.add(x, S);
      return w = t.mul(w, I), I = t.add(N, d), w = t.sub(w, I), I = t.add(y, B), b = t.add(O, S), I = t.mul(I, b), b = t.add(C, d), I = t.sub(I, b), A = t.mul(j, w), b = t.mul(L, d), A = t.add(b, A), b = t.sub(C, A), A = t.add(C, A), v = t.mul(b, A), C = t.add(N, N), C = t.add(C, N), d = t.mul(j, d), w = t.mul(L, w), C = t.add(C, d), d = t.sub(N, d), d = t.mul(j, d), w = t.add(w, d), N = t.mul(C, w), v = t.add(v, N), N = t.mul(I, w), b = t.mul(g, b), b = t.sub(b, N), N = t.mul(g, C), A = t.mul(I, A), A = t.add(A, N), new u(b, v, A);
    }
    subtract(c) {
      return this.add(c.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(c) {
      return T.wNAFCached(this, c, u.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(c) {
      et("scalar", c, G, n.n);
      const h = u.ZERO;
      if (c === G)
        return h;
      if (c === Z)
        return this;
      const { endo: y } = n;
      if (!y)
        return T.unsafeLadder(this, c);
      let { k1neg: B, k1: x, k2neg: O, k2: S } = y.splitScalar(c), b = h, v = h, A = this;
      for (; x > G || S > G; )
        x & Z && (b = b.add(A)), S & Z && (v = v.add(A)), A = A.double(), x >>= Z, S >>= Z;
      return B && (b = b.negate()), O && (v = v.negate()), v = new u(t.mul(v.px, y.beta), v.py, v.pz), b.add(v);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(c) {
      const { endo: h, n: y } = n;
      et("scalar", c, Z, y);
      let B, x;
      if (h) {
        const { k1neg: O, k1: S, k2neg: b, k2: v } = h.splitScalar(c);
        let { p: A, f: j } = this.wNAF(S), { p: L, f: N } = this.wNAF(v);
        A = T.constTimeNegate(O, A), L = T.constTimeNegate(b, L), L = new u(t.mul(L.px, h.beta), L.py, L.pz), B = A.add(L), x = j.add(N);
      } else {
        const { p: O, f: S } = this.wNAF(c);
        B = O, x = S;
      }
      return u.normalizeZ([B, x])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(c, h, y) {
      const B = u.BASE, x = (S, b) => b === G || b === Z || !S.equals(B) ? S.multiplyUnsafe(b) : S.multiply(b), O = x(this, h).add(x(c, y));
      return O.is0() ? void 0 : O;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(c) {
      return m(this, c);
    }
    isTorsionFree() {
      const { h: c, isTorsionFree: h } = n;
      if (c === Z)
        return !0;
      if (h)
        return h(u, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: c, clearCofactor: h } = n;
      return c === Z ? this : h ? h(u, this) : this.multiplyUnsafe(n.h);
    }
    toRawBytes(c = !0) {
      return ct("isCompressed", c), this.assertValidity(), s(u, this, c);
    }
    toHex(c = !0) {
      return ct("isCompressed", c), ft(this.toRawBytes(c));
    }
  }
  u.BASE = new u(n.Gx, n.Gy, t.ONE), u.ZERO = new u(t.ZERO, t.ONE, t.ZERO);
  const q = n.nBitLength, T = Oe(u, n.endo ? Math.ceil(q / 2) : q);
  return {
    CURVE: n,
    ProjectivePoint: u,
    normPrivateKeyToScalar: i,
    weierstrassEquation: a,
    isWithinCurveOrder: f
  };
}
function He(e) {
  const n = Jt(e);
  return gt(n, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...n });
}
function Ze(e) {
  const n = He(e), { Fp: t, n: r } = n, s = t.BYTES + 1, o = 2 * t.BYTES + 1;
  function a(d) {
    return U(d, r);
  }
  function f(d) {
    return St(d, r);
  }
  const { ProjectivePoint: i, normPrivateKeyToScalar: l, weierstrassEquation: m, isWithinCurveOrder: E } = Te({
    ...n,
    toBytes(d, g, w) {
      const I = g.toAffine(), $ = t.toBytes(I.x), H = dt;
      return ct("isCompressed", w), w ? H(Uint8Array.from([g.hasEvenY() ? 2 : 3]), $) : H(Uint8Array.from([4]), $, t.toBytes(I.y));
    },
    fromBytes(d) {
      const g = d.length, w = d[0], I = d.subarray(1);
      if (g === s && (w === 2 || w === 3)) {
        const $ = tt(I);
        if (!yt($, Z, t.ORDER))
          throw new Error("Point is not on curve");
        const H = m($);
        let z;
        try {
          z = t.sqrt(H);
        } catch (M) {
          const X = M instanceof Error ? ": " + M.message : "";
          throw new Error("Point is not on curve" + X);
        }
        const k = (z & Z) === Z;
        return (w & 1) === 1 !== k && (z = t.neg(z)), { x: $, y: z };
      } else if (g === o && w === 4) {
        const $ = t.fromBytes(I.subarray(0, t.BYTES)), H = t.fromBytes(I.subarray(t.BYTES, 2 * t.BYTES));
        return { x: $, y: H };
      } else
        throw new Error(`Point of length ${g} was invalid. Expected ${s} compressed bytes or ${o} uncompressed bytes`);
    }
  }), u = (d) => ft(lt(d, n.nByteLength));
  function q(d) {
    const g = r >> Z;
    return d > g;
  }
  function T(d) {
    return q(d) ? a(-d) : d;
  }
  const p = (d, g, w) => tt(d.slice(g, w));
  class c {
    constructor(g, w, I) {
      this.r = g, this.s = w, this.recovery = I, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(g) {
      const w = n.nByteLength;
      return g = K("compactSignature", g, w * 2), new c(p(g, 0, w), p(g, w, 2 * w));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(g) {
      const { r: w, s: I } = F.toSig(K("DER", g));
      return new c(w, I);
    }
    assertValidity() {
      et("r", this.r, Z, r), et("s", this.s, Z, r);
    }
    addRecoveryBit(g) {
      return new c(this.r, this.s, g);
    }
    recoverPublicKey(g) {
      const { r: w, s: I, recovery: $ } = this, H = S(K("msgHash", g));
      if ($ == null || ![0, 1, 2, 3].includes($))
        throw new Error("recovery id invalid");
      const z = $ === 2 || $ === 3 ? w + n.n : w;
      if (z >= t.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const k = $ & 1 ? "03" : "02", W = i.fromHex(k + u(z)), M = f(z), X = a(-H * M), ut = a(I * M), D = i.BASE.multiplyAndAddUnsafe(W, X, ut);
      if (!D)
        throw new Error("point at infinify");
      return D.assertValidity(), D;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return q(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new c(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return at(this.toDERHex());
    }
    toDERHex() {
      return F.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return at(this.toCompactHex());
    }
    toCompactHex() {
      return u(this.r) + u(this.s);
    }
  }
  const h = {
    isValidPrivateKey(d) {
      try {
        return l(d), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: l,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const d = Qt(n.n);
      return Ae(n.randomBytes(d), n.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(d = 8, g = i.BASE) {
      return g._setWindowSize(d), g.multiply(BigInt(3)), g;
    }
  };
  function y(d, g = !0) {
    return i.fromPrivateKey(d).toRawBytes(g);
  }
  function B(d) {
    const g = nt(d), w = typeof d == "string", I = (g || w) && d.length;
    return g ? I === s || I === o : w ? I === 2 * s || I === 2 * o : d instanceof i;
  }
  function x(d, g, w = !0) {
    if (B(d))
      throw new Error("first arg must be private key");
    if (!B(g))
      throw new Error("second arg must be public key");
    return i.fromHex(g).multiply(l(d)).toRawBytes(w);
  }
  const O = n.bits2int || function(d) {
    const g = tt(d), w = d.length * 8 - n.nBitLength;
    return w > 0 ? g >> BigInt(w) : g;
  }, S = n.bits2int_modN || function(d) {
    return a(O(d));
  }, b = Lt(n.nBitLength);
  function v(d) {
    return et(`num < 2^${n.nBitLength}`, d, G, b), lt(d, n.nByteLength);
  }
  function A(d, g, w = j) {
    if (["recovered", "canonical"].some((Q) => Q in w))
      throw new Error("sign() legacy options not supported");
    const { hash: I, randomBytes: $ } = n;
    let { lowS: H, prehash: z, extraEntropy: k } = w;
    H == null && (H = !0), d = K("msgHash", d), jt(w), z && (d = K("prehashed msgHash", I(d)));
    const W = S(d), M = l(g), X = [v(M), v(W)];
    if (k != null && k !== !1) {
      const Q = k === !0 ? $(t.BYTES) : k;
      X.push(K("extraEntropy", Q));
    }
    const ut = dt(...X), D = W;
    function pt(Q) {
      const rt = O(Q);
      if (!E(rt))
        return;
      const _t = f(rt), ot = i.BASE.multiply(rt).toAffine(), Y = a(ot.x);
      if (Y === G)
        return;
      const it = a(_t * a(D + Y * M));
      if (it === G)
        return;
      let Tt = (ot.x === Y ? 0 : 2) | Number(ot.y & Z), Ht = it;
      return H && q(it) && (Ht = T(it), Tt ^= 1), new c(Y, Ht, Tt);
    }
    return { seed: ut, k2sig: pt };
  }
  const j = { lowS: n.lowS, prehash: !1 }, L = { lowS: n.lowS, prehash: !1 };
  function N(d, g, w = j) {
    const { seed: I, k2sig: $ } = A(d, g, w), H = n;
    return Gt(H.hash.outputLen, H.nByteLength, H.hmac)(I, $);
  }
  i.BASE._setWindowSize(8);
  function C(d, g, w, I = L) {
    var ot;
    const $ = d;
    if (g = K("msgHash", g), w = K("publicKey", w), "strict" in I)
      throw new Error("options.strict was renamed to lowS");
    jt(I);
    const { lowS: H, prehash: z } = I;
    let k, W;
    try {
      if (typeof $ == "string" || nt($))
        try {
          k = c.fromDER($);
        } catch (Y) {
          if (!(Y instanceof F.Err))
            throw Y;
          k = c.fromCompact($);
        }
      else if (typeof $ == "object" && typeof $.r == "bigint" && typeof $.s == "bigint") {
        const { r: Y, s: it } = $;
        k = new c(Y, it);
      } else
        throw new Error("PARSE");
      W = i.fromHex(w);
    } catch (Y) {
      if (Y.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (H && k.hasHighS())
      return !1;
    z && (g = n.hash(g));
    const { r: M, s: X } = k, ut = S(g), D = f(X), pt = a(ut * D), Q = a(M * D), rt = (ot = i.BASE.multiplyAndAddUnsafe(W, pt, Q)) == null ? void 0 : ot.toAffine();
    return rt ? a(rt.x) === M : !1;
  }
  return {
    CURVE: n,
    getPublicKey: y,
    getSharedSecret: x,
    sign: N,
    verify: C,
    ProjectivePoint: i,
    Signature: c,
    utils: h
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Re(e) {
  return {
    hash: e,
    hmac: (n, ...t) => Pt(e, n, se(...t)),
    randomBytes: ie
  };
}
function ze(e, n) {
  const t = (r) => Ze({ ...e, ...Re(r) });
  return Object.freeze({ ...t(n), create: t });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const te = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Mt = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), ke = BigInt(1), It = BigInt(2), Yt = (e, n) => (e + n / It) / n;
function Ue(e) {
  const n = te, t = BigInt(3), r = BigInt(6), s = BigInt(11), o = BigInt(22), a = BigInt(23), f = BigInt(44), i = BigInt(88), l = e * e * e % n, m = l * l * e % n, E = V(m, t, n) * m % n, u = V(E, t, n) * m % n, q = V(u, It, n) * l % n, T = V(q, s, n) * q % n, p = V(T, o, n) * T % n, c = V(p, f, n) * p % n, h = V(c, i, n) * c % n, y = V(h, f, n) * p % n, B = V(y, t, n) * m % n, x = V(B, a, n) * T % n, O = V(x, r, n) * l % n, S = V(O, It, n);
  if (!At.eql(At.sqr(S), e))
    throw new Error("Cannot find square root");
  return S;
}
const At = Xt(te, void 0, void 0, { sqrt: Ue }), Ce = ze({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: At,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Mt,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (e) => {
      const n = Mt, t = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -ke * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), o = t, a = BigInt("0x100000000000000000000000000000000"), f = Yt(o * e, n), i = Yt(-r * e, n);
      let l = U(e - f * t - i * s, n), m = U(-f * r - i * o, n);
      const E = l > a, u = m > a;
      if (E && (l = n - l), u && (m = n - m), l > a || m > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + e);
      return { k1neg: E, k1: l, k2neg: u, k2: m };
    }
  }
}, ce);
BigInt(0);
Ce.ProjectivePoint;
export {
  Ce as secp256k1
};