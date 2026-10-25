package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/yadore-publisher-sdk/go"
)

// ListArgs is what an agent sends to yadore-publisher_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: conversion_detail | conversion_detail_merchant | deeplink_merchant | market | merchant | offer | report_detail"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to yadore-publisher_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: conversion_general | conversion_status | dnt | offer | report_general | report_modified | report_status"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.YadorePublisherSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "yadore-publisher_list",
		Description: "List records from YadorePublisher. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("conversion_detail", "conversion_detail_merchant", "deeplink_merchant", "market", "merchant", "offer", "report_detail"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "yadore-publisher_load",
		Description: "Load one record from YadorePublisher. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("conversion_general", "conversion_status", "dnt", "offer", "report_general", "report_modified", "report_status"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.YadorePublisherSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.YadorePublisherSDK, name string) (sdk.YadorePublisherEntity, error) {
	switch strings.ToLower(name) {
	case "conversion_detail":
		return client.ConversionDetail(nil), nil
	case "conversion_detail_merchant":
		return client.ConversionDetailMerchant(nil), nil
	case "conversion_general":
		return client.ConversionGeneral(nil), nil
	case "conversion_status":
		return client.ConversionStatus(nil), nil
	case "deeplink":
		return client.Deeplink(nil), nil
	case "deeplink_merchant":
		return client.DeeplinkMerchant(nil), nil
	case "dnt":
		return client.Dnt(nil), nil
	case "market":
		return client.Market(nil), nil
	case "merchant":
		return client.Merchant(nil), nil
	case "offer":
		return client.Offer(nil), nil
	case "report_detail":
		return client.ReportDetail(nil), nil
	case "report_general":
		return client.ReportGeneral(nil), nil
	case "report_modified":
		return client.ReportModified(nil), nil
	case "report_status":
		return client.ReportStatus(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
