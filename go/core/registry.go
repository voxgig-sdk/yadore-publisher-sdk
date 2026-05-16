package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewConversionDetailEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewConversionDetailMerchantEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewConversionGeneralEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewConversionStatusEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewDeeplinkEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewDeeplinkMerchantEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewDntEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewMarketEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewMerchantEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewOfferEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewReportDetailEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewReportGeneralEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewReportModifiedEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

var NewReportStatusEntityFunc func(client *YadorePublisherSDK, entopts map[string]any) YadorePublisherEntity

