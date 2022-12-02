---
to: packages/pop-fe/src/common/reducer/<%=store%>.tsx
inject: true
before : "default :"
---
        case <%=action.toUpperCase()%> :
            return {
                ...state,
                
            }