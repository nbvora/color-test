import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Guest from "./Guest";
import { setStartLoader, setStopLoader } from "../../Store/action/loader";

function mapStateToProps(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setStartLoader,
      setStopLoader,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
