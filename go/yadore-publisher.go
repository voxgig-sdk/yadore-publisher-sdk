package voxgigyadorepublishersdk

import (
	"github.com/voxgig-sdk/yadore-publisher-sdk/go/core"
	"github.com/voxgig-sdk/yadore-publisher-sdk/go/entity"
	"github.com/voxgig-sdk/yadore-publisher-sdk/go/feature"
	_ "github.com/voxgig-sdk/yadore-publisher-sdk/go/utility"
)

// Type aliases preserve external API.
type YadorePublisherSDK = core.YadorePublisherSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type YadorePublisherEntity = core.YadorePublisherEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type YadorePublisherError = core.YadorePublisherError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewConversionDetailEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewConversionDetailEntity(client, entopts)
	}
	core.NewConversionDetailMerchantEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewConversionDetailMerchantEntity(client, entopts)
	}
	core.NewConversionGeneralEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewConversionGeneralEntity(client, entopts)
	}
	core.NewConversionStatusEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewConversionStatusEntity(client, entopts)
	}
	core.NewDeeplinkEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewDeeplinkEntity(client, entopts)
	}
	core.NewDeeplinkMerchantEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewDeeplinkMerchantEntity(client, entopts)
	}
	core.NewDntEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewDntEntity(client, entopts)
	}
	core.NewMarketEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewMarketEntity(client, entopts)
	}
	core.NewMerchantEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewMerchantEntity(client, entopts)
	}
	core.NewOfferEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewOfferEntity(client, entopts)
	}
	core.NewReportDetailEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewReportDetailEntity(client, entopts)
	}
	core.NewReportGeneralEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewReportGeneralEntity(client, entopts)
	}
	core.NewReportModifiedEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewReportModifiedEntity(client, entopts)
	}
	core.NewReportStatusEntityFunc = func(client *core.YadorePublisherSDK, entopts map[string]any) core.YadorePublisherEntity {
		return entity.NewReportStatusEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewYadorePublisherSDK = core.NewYadorePublisherSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewYadorePublisherSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *YadorePublisherSDK  { return NewYadorePublisherSDK(nil) }
func Test() *YadorePublisherSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
