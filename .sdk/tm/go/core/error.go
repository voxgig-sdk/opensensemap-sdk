package core

type OpensensemapError struct {
	IsOpensensemapError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpensensemapError(code string, msg string, ctx *Context) *OpensensemapError {
	return &OpensensemapError{
		IsOpensensemapError: true,
		Sdk:              "Opensensemap",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpensensemapError) Error() string {
	return e.Msg
}
