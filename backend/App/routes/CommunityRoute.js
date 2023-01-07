const express = require('express');
const communityRoute = express.Router();
const communityController = require('../controllers/CommunityController');
const {checkAuthToken} = require('./../services/jwt');
const upload = require('../utils/uploadPhotos')

communityRoute.post('/create/group',upload, checkAuthToken, communityController.CreateNewGroup);
communityRoute.post('/update/group/:id',upload, checkAuthToken, communityController.UpdateGroup);
communityRoute.get('/delete/group/:id', checkAuthToken, communityController.DeleteGroup);
communityRoute.post('/create/page',upload, checkAuthToken, communityController.CreateNewPage);
communityRoute.get('/get/groups', checkAuthToken, communityController.GetGroups);
communityRoute.get('/', communityController.GetAllGroups);
communityRoute.get('/get/pages', checkAuthToken, communityController.GetPages);
communityRoute.get('/my/groups', checkAuthToken, communityController.GetMyGroups);
communityRoute.get('/joint/groups', checkAuthToken, communityController.GetJointGroups);
communityRoute.post('/join/group/:id', checkAuthToken, communityController.JoinGroup);
communityRoute.get('/check/group/:groupid', checkAuthToken, communityController.CheckJoinGroup);

communityRoute.get('/group/members/:id', checkAuthToken, communityController.GetGroupMembers);





communityRoute.post('/group/post/:group_id',upload, checkAuthToken, communityController.GroupPost);
communityRoute.get('/group/posts/:group_id', checkAuthToken, communityController.GetGroupPosts);
communityRoute.get('/page/posts/:page_id', checkAuthToken, communityController.GetPagePosts);
communityRoute.get('/get/group/name/:group_id', checkAuthToken, communityController.GetGroupName);
communityRoute.post('/post/group/reaction', checkAuthToken, communityController.GroupPostReraction);
communityRoute.post('/post/page/reaction', checkAuthToken, communityController.PagePostReraction);




communityRoute.get('/check/page/:page_id', checkAuthToken, communityController.CheckFollowPage);
communityRoute.post('/follow/page', checkAuthToken, communityController.FollowPage);
communityRoute.post('/page/post/:page_id', upload, checkAuthToken, communityController.PagePost);




communityRoute.get('/page/info/:page_id', checkAuthToken, communityController.GetPageInfos);
communityRoute.get('/group/info/:group_id', checkAuthToken, communityController.GetGroupInfos);
communityRoute.get('/followed/page/posts', checkAuthToken, communityController.GetFollowedPosts);




module.exports = communityRoute;