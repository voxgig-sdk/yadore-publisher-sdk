package core

type YadorePublisherError struct {
	IsYadorePublisherError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewYadorePublisherError(code string, msg string, ctx *Context) *YadorePublisherError {
	return &YadorePublisherError{
		IsYadorePublisherError: true,
		Sdk:              "YadorePublisher",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *YadorePublisherError) Error() string {
	return e.Msg
}
