import { combineReducers } from '@reduxjs/toolkit';

import articleReducer from '@redux/reducer/articleReducer';
import authReducer from '@redux/reducer/authReducer';
import publisherReducer from './publisherReducer';
import permissionReducer from './permissionReducer';
import roleReducer from './roleReducer';
import policyReducer from './policyReducer';
import policyPermissionReducer from './policyPermissionReducer';
import policyRoleReducer from './policyRoleReducer';

const appReducer = combineReducers({
  article: articleReducer,
  auth: authReducer,
  publisher: publisherReducer,
  role: roleReducer,
  policy: policyReducer,
  permission: permissionReducer,
  policyPermission: policyPermissionReducer,
  policyRole: policyRoleReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
