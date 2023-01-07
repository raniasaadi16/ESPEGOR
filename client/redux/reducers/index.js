import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import CompetitionsReducer from "./CompetitionsReducer";
import ErrReducer from "./ErrReducer";
import GamesReducer from "./GamesReducer";
import OffersReducer from "./OffersReducer";
import UiReducer from "./UiReducer";
import GroupsReducer from "./GroupsReducer ";


const combinedReducer = combineReducers({
    auth: AuthReducer,
    comps: CompetitionsReducer,
    games: GamesReducer,
    offers: OffersReducer,
    ui: UiReducer,
    err: ErrReducer,
    groups: GroupsReducer
})
const reducers = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload
      }
      return nextState
    } else {
      return combinedReducer(state, action)
    }
}
export default reducers