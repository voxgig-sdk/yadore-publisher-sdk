// YadorePublisher Ts SDK

import { ConversionDetailEntity } from './entity/ConversionDetailEntity'
import { ConversionDetailMerchantEntity } from './entity/ConversionDetailMerchantEntity'
import { ConversionGeneralEntity } from './entity/ConversionGeneralEntity'
import { ConversionStatusEntity } from './entity/ConversionStatusEntity'
import { DeeplinkEntity } from './entity/DeeplinkEntity'
import { DeeplinkMerchantEntity } from './entity/DeeplinkMerchantEntity'
import { DntEntity } from './entity/DntEntity'
import { MarketEntity } from './entity/MarketEntity'
import { MerchantEntity } from './entity/MerchantEntity'
import { OfferEntity } from './entity/OfferEntity'
import { ReportDetailEntity } from './entity/ReportDetailEntity'
import { ReportGeneralEntity } from './entity/ReportGeneralEntity'
import { ReportModifiedEntity } from './entity/ReportModifiedEntity'
import { ReportStatusEntity } from './entity/ReportStatusEntity'

export type * from './YadorePublisherTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { YadorePublisherEntityBase } from './YadorePublisherEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class YadorePublisherSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _conversion_detail?: ConversionDetailEntity

  // Idiomatic facade: `client.conversion_detail.list()` / `client.conversion_detail.load({ id })`.
  get conversion_detail(): ConversionDetailEntity {
    return (this._conversion_detail ??= new ConversionDetailEntity(this, undefined))
  }

  /** @deprecated Use `client.conversion_detail` instead. */
  ConversionDetail(data?: any) {
    const self = this
    return new ConversionDetailEntity(self,data)
  }


  _conversion_detail_merchant?: ConversionDetailMerchantEntity

  // Idiomatic facade: `client.conversion_detail_merchant.list()` / `client.conversion_detail_merchant.load({ id })`.
  get conversion_detail_merchant(): ConversionDetailMerchantEntity {
    return (this._conversion_detail_merchant ??= new ConversionDetailMerchantEntity(this, undefined))
  }

  /** @deprecated Use `client.conversion_detail_merchant` instead. */
  ConversionDetailMerchant(data?: any) {
    const self = this
    return new ConversionDetailMerchantEntity(self,data)
  }


  _conversion_general?: ConversionGeneralEntity

  // Idiomatic facade: `client.conversion_general.list()` / `client.conversion_general.load({ id })`.
  get conversion_general(): ConversionGeneralEntity {
    return (this._conversion_general ??= new ConversionGeneralEntity(this, undefined))
  }

  /** @deprecated Use `client.conversion_general` instead. */
  ConversionGeneral(data?: any) {
    const self = this
    return new ConversionGeneralEntity(self,data)
  }


  _conversion_status?: ConversionStatusEntity

  // Idiomatic facade: `client.conversion_status.list()` / `client.conversion_status.load({ id })`.
  get conversion_status(): ConversionStatusEntity {
    return (this._conversion_status ??= new ConversionStatusEntity(this, undefined))
  }

  /** @deprecated Use `client.conversion_status` instead. */
  ConversionStatus(data?: any) {
    const self = this
    return new ConversionStatusEntity(self,data)
  }


  _deeplink?: DeeplinkEntity

  // Idiomatic facade: `client.deeplink.list()` / `client.deeplink.load({ id })`.
  get deeplink(): DeeplinkEntity {
    return (this._deeplink ??= new DeeplinkEntity(this, undefined))
  }

  /** @deprecated Use `client.deeplink` instead. */
  Deeplink(data?: any) {
    const self = this
    return new DeeplinkEntity(self,data)
  }


  _deeplink_merchant?: DeeplinkMerchantEntity

  // Idiomatic facade: `client.deeplink_merchant.list()` / `client.deeplink_merchant.load({ id })`.
  get deeplink_merchant(): DeeplinkMerchantEntity {
    return (this._deeplink_merchant ??= new DeeplinkMerchantEntity(this, undefined))
  }

  /** @deprecated Use `client.deeplink_merchant` instead. */
  DeeplinkMerchant(data?: any) {
    const self = this
    return new DeeplinkMerchantEntity(self,data)
  }


  _dnt?: DntEntity

  // Idiomatic facade: `client.dnt.list()` / `client.dnt.load({ id })`.
  get dnt(): DntEntity {
    return (this._dnt ??= new DntEntity(this, undefined))
  }

  /** @deprecated Use `client.dnt` instead. */
  Dnt(data?: any) {
    const self = this
    return new DntEntity(self,data)
  }


  _market?: MarketEntity

  // Idiomatic facade: `client.market.list()` / `client.market.load({ id })`.
  get market(): MarketEntity {
    return (this._market ??= new MarketEntity(this, undefined))
  }

  /** @deprecated Use `client.market` instead. */
  Market(data?: any) {
    const self = this
    return new MarketEntity(self,data)
  }


  _merchant?: MerchantEntity

  // Idiomatic facade: `client.merchant.list()` / `client.merchant.load({ id })`.
  get merchant(): MerchantEntity {
    return (this._merchant ??= new MerchantEntity(this, undefined))
  }

  /** @deprecated Use `client.merchant` instead. */
  Merchant(data?: any) {
    const self = this
    return new MerchantEntity(self,data)
  }


  _offer?: OfferEntity

  // Idiomatic facade: `client.offer.list()` / `client.offer.load({ id })`.
  get offer(): OfferEntity {
    return (this._offer ??= new OfferEntity(this, undefined))
  }

  /** @deprecated Use `client.offer` instead. */
  Offer(data?: any) {
    const self = this
    return new OfferEntity(self,data)
  }


  _report_detail?: ReportDetailEntity

  // Idiomatic facade: `client.report_detail.list()` / `client.report_detail.load({ id })`.
  get report_detail(): ReportDetailEntity {
    return (this._report_detail ??= new ReportDetailEntity(this, undefined))
  }

  /** @deprecated Use `client.report_detail` instead. */
  ReportDetail(data?: any) {
    const self = this
    return new ReportDetailEntity(self,data)
  }


  _report_general?: ReportGeneralEntity

  // Idiomatic facade: `client.report_general.list()` / `client.report_general.load({ id })`.
  get report_general(): ReportGeneralEntity {
    return (this._report_general ??= new ReportGeneralEntity(this, undefined))
  }

  /** @deprecated Use `client.report_general` instead. */
  ReportGeneral(data?: any) {
    const self = this
    return new ReportGeneralEntity(self,data)
  }


  _report_modified?: ReportModifiedEntity

  // Idiomatic facade: `client.report_modified.list()` / `client.report_modified.load({ id })`.
  get report_modified(): ReportModifiedEntity {
    return (this._report_modified ??= new ReportModifiedEntity(this, undefined))
  }

  /** @deprecated Use `client.report_modified` instead. */
  ReportModified(data?: any) {
    const self = this
    return new ReportModifiedEntity(self,data)
  }


  _report_status?: ReportStatusEntity

  // Idiomatic facade: `client.report_status.list()` / `client.report_status.load({ id })`.
  get report_status(): ReportStatusEntity {
    return (this._report_status ??= new ReportStatusEntity(this, undefined))
  }

  /** @deprecated Use `client.report_status` instead. */
  ReportStatus(data?: any) {
    const self = this
    return new ReportStatusEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new YadorePublisherSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return YadorePublisherSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'YadorePublisher' }
  }

  toString() {
    return 'YadorePublisher ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = YadorePublisherSDK


export {
  stdutil,

  BaseFeature,
  YadorePublisherEntityBase,

  YadorePublisherSDK,
  SDK,
}


