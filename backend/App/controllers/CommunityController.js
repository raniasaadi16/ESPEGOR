const conn = require('../database/connection').pool;

function CreateNewGroup(req, res) {
    const user = req.user;
    if (user.type !== 2) return res.json({
        msg: 'You cannot create a group because you are not an admin',
    });
    try {
        const {name, description} = req.body;
        
        let icon;
        if (!req.files || Object.keys(req.files).length === 0){
            icon = 'defaultGroupIcon.jpg';
        } else {
            const file = req.files.icon;
            icon = file.name;
            var uploadDir = './assets/community/' + icon;
            file.mv(uploadDir);
        }
        
        const group = {
            name: name,
            description: description,
            // Icon
            icon: icon,
            user_id: user.id,
        };
        
        conn.getConnection((err, connection) => {
            connection.query('INSERT INTO groups SET ?', group, (err, result) => {
                connection.release();
                res.json({
                    msg: 'data has been inserted successfully',
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}

function CreateNewPage(req, res) {
    const user = req.user;
    try {
        const {name, description} = req.body;
        
        let icon;
        if (!req.files || Object.keys(req.files).length === 0){
            icon = 'defaultGroupIcon.jpg';
        } else {
            const file = req.files.icon;
            icon = file.name;
            var uploadDir = './assets/community/' + icon;
            file.mv(uploadDir);
        }
        
        const page = {
            name: name,
            description: description,
            // Icon
            icon: icon,
            user_id: user.id,
        };
        
        conn.getConnection((err, connection) => {
            connection.query('INSERT INTO pages SET ?', page, (err, result) => {
                connection.release();
                res.json({
                    msg: 'data has been inserted successfully',
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}

function GetGroups(req, res){

    const limit = 15;
    const page = req.query.page;
    const offset = (page - 1) * limit;

    conn.getConnection((err, connection) => {
        const query = `
            SELECT  g.*, 
                    (SELECT count(*) FROM users_groups ug WHERE g.id = ug.group_id) AS members,
                    (SELECT count(*) FROM groupposts gp WHERE g.id = gp.group_id) AS posts,
                    (SELECT count(*) FROM groupposts_reactions gpr JOIN groupposts gpp ON gpp.id = gpr.grouppost_id WHERE (gpr.grouppost_id = gpp.id AND gpr.reaction = 2)) AS total_likes,
                    (SELECT count(*) FROM groupposts_reactions gpr JOIN groupposts gpp ON gpp.id = gpr.grouppost_id WHERE (gpr.grouppost_id = gpp.id AND gpr.reaction = 1)) AS total_dislikes
            FROM groups g
            LIMIT ${limit} OFFSET ${offset}
        `;
        connection.query(query, (err, result) => {
            connection.query('SELECT COUNT(*) AS count FROM groups', (err, resCount) => {
                connection.release();
                res.json({
                    'groups': result,
                    'pages': Math.ceil(resCount[0].count/limit),
                    'current_number':page,
                });
            });
        });
    });
}

function GetPages(req, res){
    
    const limit = 15;
    const page = req.query.page;
    const offset = (page - 1) * limit;

    conn.getConnection((err, connection) => {
        const query = `
            SELECT p.*, 
                u.name,
                (SELECT count(*) FROM users_pages up WHERE p.id = up.page_id) AS followers,
                (SELECT count(*) FROM pageposts pp WHERE p.id = pp.page_id) AS posts,
                (SELECT count(*) FROM pageposts_reactions ppr JOIN pageposts ppp ON ppp.id = ppr.pagepost_id WHERE (ppr.pagepost_id = ppp.id AND ppr.reaction = 2)) AS total_likes,
                (SELECT count(*) FROM pageposts_reactions ppr JOIN pageposts ppp ON ppp.id = ppr.pagepost_id WHERE (ppr.pagepost_id = ppp.id AND ppr.reaction = 1)) AS total_dislikes
            FROM pages p JOIN users u ON u.id = p.user_id
            LIMIT ${limit} OFFSET ${offset}
        `;


        connection.query(query, (err, result) => {
            connection.query('SELECT COUNT(*) AS count FROM pages', (err, resCount) => {
                connection.release();
                res.json({
                    'pagesList': result,
                    'pages': Math.ceil(resCount[0].count/limit),
                    'current_number':page,
                });
            });
        });
    });
}

function GetGroupInfos(req, res){
    conn.getConnection((err, connection) => {
        const query = `
            SELECT g.*,
                (SELECT count(*) FROM groupposts WHERE group_id = ?) as posts,
                (SELECT count(*) FROM users_groups WHERE group_id = ?) as followers, 
                (SELECT count(*) FROM groupposts_reactions gpr JOIN groupposts gp ON gp.id = gpr.grouppost_id WHERE (gp.id = gpr.grouppost_id AND gpr.reaction = 2)) AS total_likes,
                (SELECT count(*) FROM groupposts_reactions gpr JOIN groupposts gp ON gp.id = gpr.grouppost_id WHERE (gp.id = gpr.grouppost_id AND gpr.reaction = 1)) AS total_dislikes
            FROM groups g WHERE g.id = ?
        `;

        const group_id = req.params.group_id;

        connection.query(query, [group_id, group_id, group_id], (err, result) => {
            connection.release();
            res.json(result[0]);
        });
    });
}

function DeleteGroup (req, res){ 
    conn.getConnection((err, connection) => {
        const query = `
            DELETE FROM groups WHERE id = ?
        `;

        const id = req.params.id;

        connection.query(query, id, (err, result) => {
            connection.release();
            res.json({
                msg:'Group Has Been Deleted Successfully'
            });
        });
    });
}

function UpdateGroup (req, res){ 

    try {

        const {name, description} = req.body;
        const id = req.params.id;

        if (req.files && Object.keys(req.files).length !== 0){

            const file = req.files.icon;
            var uploadDir = './assets/community/' + file.name;
            file.mv(uploadDir);

            conn.getConnection((err, connection) => {
                const query = `UPDATE groups SET 
                        name = ?,
                        description = ?,
                        icon = ?
                    WHERE id = ?`;
                connection.query(query, [name, description, file.name, id], (err, result) => {
                    connection.release();
                    res.json({
                        msg: 'Data has been updated successfully',
                    });
                });
            });
        } else {
            conn.getConnection((err, connection) => {
                const query = `UPDATE groups SET 
                        name = ?,
                        description = ?
                    WHERE id = ?`;
                connection.query(query, [name, description, id], (err, result) => {
                    connection.release();
                    res.json({
                        msg: 'Data has been updated successfully',
                    });
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function GetPageInfos(req, res){
    conn.getConnection((err, connection) => {
        const query = `
            SELECT p.*,
                (SELECT count(*) FROM pageposts WHERE page_id = ?) as posts,
                (SELECT count(*) FROM users_pages WHERE page_id = ?) as followers, 
                (SELECT count(*) FROM pageposts_reactions ppr JOIN pageposts ppp ON ppp.id = ppr.pagepost_id WHERE (ppp.id = ppr.pagepost_id AND ppr.reaction = 2)) AS total_likes,
                (SELECT count(*) FROM pageposts_reactions ppr JOIN pageposts ppp ON ppp.id = ppr.pagepost_id WHERE (ppp.id = ppr.pagepost_id AND ppr.reaction = 1)) AS total_dislikes
            FROM pages p WHERE p.id = ?
        `;

        const page_id = req.params.page_id;

        connection.query(query, [page_id, page_id, page_id, page_id, page_id], (err, result) => {
            connection.release();
            res.json(result[0]);
        });
    });
}

function GetMyGroups(req, res){
    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM groups WHERE user_id = ?', req.user.id, (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function GetJointGroups(req, res){
    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM users_groups ug JOIN groups g ON g.id = ug.group_id WHERE ug.user_id = ?', req.user.id, (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function CheckJoinGroup(req, res){

    const group_id = req.params.groupid;

    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM users_groups WHERE user_id = ? AND group_id = ? ',[req.user.id, group_id], (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function JoinGroup(req, res){
    const user = req.user;
    const record = {
        user_id: user.id,
        group_id: req.body.id
    };

    conn.getConnection((err, connection) => {
        const query  = 'INSERT INTO users_groups SET ?';
        connection.query(query, record, (err, result) => {
            connection.release();
            res.json({
                msg: 'User Has Been Joined',
            });
        });
    });
}

function GroupPost(req, res) {

    if (!req.files || Object.keys(req.files).length === 0){
        return res.json({msg: 'No File Is Here'});
    }

    try {


        conn.getConnection((err, connection) => {

            const file = req.files.file; 

            const record = {
                title: req.body.title,
                path: file.name,
                user_id: req.user.id,
                group_id: req.params.group_id,
            };
                        
            const uploadDir = './assets/community/' +  file.name;
            file.mv(uploadDir);
    
            const query  = 'INSERT INTO groupposts SET ?';
    
            connection.query(query, record, (err, result) => {
                connection.release();
                res.json({
                    msg: 'Post Has Been Saved',
                });
            });
        });

    } catch (error) {
        
    }
    
}

function PagePost(req, res) {

    
    if (!req.files || Object.keys(req.files).length === 0){
        return res.json({msg: 'No File Is Here'});
    }

    try {
        conn.getConnection((err, connection) => {

            const file = req.files.file; 

            const record = {
                title: req.body.title,
                path: file.name,
                page_id: req.params.page_id,
            };

                        
            const uploadDir = './assets/community/' + file.name;
            file.mv(uploadDir);
    
            const query  = 'INSERT INTO pageposts SET ?';
    
            connection.query(query, record, (err, result) => {
                connection.release();
                res.json({
                    msg: 'Post Has Been Saved',
                });
            });
        });

    } catch (error) {
        
    }
    
}

function GetGroupName(req, res){

    conn.getConnection((err, connection) => {
        const query = `
            SELECT name FROM groups WHERE id = ?
        `;

        connection.query(query, req.params.group_id, (err, result) => {
            connection.release();
            res.json(result[0]);
        });
    });
}

function GetPagePosts(req, res){

    conn.getConnection((err, connection) => {
        const query = `
            SELECT p.*,
                (SELECT count(*) FROM pageposts_reactions pr WHERE (pr.reaction = 2 AND pr.pagepost_id = p.id)) AS likes,
                (SELECT count(*) FROM pageposts_reactions pr WHERE (pr.reaction = 1 AND pr.pagepost_id = p.id)) AS dislikes,
                (SELECT reaction FROM pageposts_reactions pr WHERE (pr.user_id = ? AND pr.pagepost_id = p.id)) AS reaction
            FROM pageposts p
            WHERE p.page_id = ?
        `;

        const page_id = req.params.page_id;
        const user_id = req.user.id;

        connection.query(query, [user_id, page_id], (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function GetGroupPosts(req, res){

    conn.getConnection((err, connection) => {
        const query = `
            SELECT g.*,
                (SELECT count(*) FROM groupposts_reactions gr WHERE (gr.reaction = 2 AND gr.grouppost_id = g.id)) AS likes,
                (SELECT count(*) FROM groupposts_reactions gr WHERE (gr.reaction = 1 AND gr.grouppost_id = g.id)) AS dislikes,
                (SELECT reaction FROM groupposts_reactions gr WHERE (gr.user_id = ? AND gr.grouppost_id = g.id)) AS reaction
            FROM groupposts g
            WHERE g.group_id = ?
        `;

        const group_id = req.params.group_id;
        const user_id = req.user.id;

        connection.query(query, [user_id, group_id], (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function PagePostReraction(req, res){
    const user  = req.user;
    
    const record = {
        pagepost_id: req.body.post_id,
        user_id: user.id,
        reaction: req.body.reaction
    }

    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM pageposts_reactions WHERE (pagepost_id = ? AND user_id = ?)', [record.pagepost_id, record.user_id], (err, resu) => {
            if (resu.length === 0){
                connection.query('INSERT INTO pageposts_reactions SET ?', record, (err, result) => {
                    connection.release();
                    return res.json(result);
                });
            } else {
                connection.query('UPDATE pageposts_reactions SET reaction = ? WHERE (pagepost_id = ? AND user_id = ?)', [record.reaction, record.pagepost_id, record.user_id], (err, result) => {
                    connection.release();
                    return res.json(result);
                });
            }
        });
    });
}

function GroupPostReraction(req, res){
    const user  = req.user;
    
    const record = {
        grouppost_id: req.body.post_id,
        user_id: user.id,
        reaction: req.body.reaction
    }

    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM groupposts_reactions WHERE (grouppost_id = ? AND user_id = ?)', [record.grouppost_id, record.user_id], (err, resu) => {
            if (resu.length === 0){
                connection.query('INSERT INTO groupposts_reactions SET ?', record, (err, result) => {
                    connection.release();
                    return res.json(result);
                });
            } else {
                connection.query('UPDATE groupposts_reactions SET reaction = ? WHERE (grouppost_id = ? AND user_id = ?)', [record.reaction, record.grouppost_id, record.user_id], (err, result) => {
                    connection.release();
                    return res.json(result);
                });
            }
        });
    });
}

function IsReacted(req, res){

    const user_id  = req.user.id;
    const post_id = req.body.post_id;


    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM groupposts_reactions WHERE (grouppost_id = ? AND user_id = ?)', [post_id, user_id], (err, result) => {
            if (result.length > 0) {
                res.json({
                    reaction: result[0].reaction,
                });
            } else {
                res.json({reaction: 0});
            }
        });
    });
}

function CheckFollowPage(req, res){

    const page_id = req.params.page_id;

    conn.getConnection((err, connection) => {
        connection.query('SELECT * FROM users_pages WHERE user_id = ? AND page_id = ? ',[req.user.id, page_id], (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}

function FollowPage(req, res){
    const user = req.user;
    const record = {
        user_id: user.id,
        page_id: req.body.id
    };

    conn.getConnection((err, connection) => {
        const query  = 'INSERT INTO users_pages SET ?';
        connection.query(query, record, (err, result) => {
            connection.release();
            res.json({
                msg: 'User Has Been Followed',
            });
        });
    });
}

function GetFollowedPosts(req, res) {
    
    const user = req.user;

    conn.getConnection((err, connection) => {
        const query = `
            SELECT p.*, pg.icon, pg.name,
                (SELECT count(*) FROM pageposts_reactions pr WHERE (pr.reaction = 2 AND pr.pagepost_id = p.id)) AS likes,
                (SELECT count(*) FROM pageposts_reactions pr WHERE (pr.reaction = 1 AND pr.pagepost_id = p.id)) AS dislikes,
                (SELECT reaction FROM pageposts_reactions pr WHERE (pr.user_id = ? AND pr.pagepost_id = p.id)) AS reaction
            FROM pageposts p JOIN pages pg ON pg.id = p.page_id
                             JOIN users_pages up ON pg.id = up.page_id
            WHERE up.user_id = ?
        `;
        connection.query(query,[user.id, user.id], (err, result) => {
            connection.release();
            res.json(result);
        });
    });
}



module.exports.CreateNewGroup = CreateNewGroup;
module.exports.CreateNewPage = CreateNewPage;
module.exports.GetGroups = GetGroups;
module.exports.GetPages = GetPages;
module.exports.GetMyGroups = GetMyGroups;
module.exports.DeleteGroup = DeleteGroup;
module.exports.UpdateGroup = UpdateGroup;
module.exports.GetJointGroups = GetJointGroups;
module.exports.CheckJoinGroup = CheckJoinGroup;
module.exports.JoinGroup = JoinGroup;
module.exports.GroupPost = GroupPost;
module.exports.PagePost = PagePost;
module.exports.GetGroupName = GetGroupName;
module.exports.GetGroupPosts = GetGroupPosts; 
module.exports.GetPagePosts = GetPagePosts; 
module.exports.GroupPostReraction = GroupPostReraction; 
module.exports.PagePostReraction = PagePostReraction; 
module.exports.IsReacted = IsReacted;


module.exports.CheckFollowPage = CheckFollowPage; 
module.exports.FollowPage = FollowPage; 
module.exports.GetPageInfos = GetPageInfos; 
module.exports.GetGroupInfos = GetGroupInfos; 
module.exports.GetFollowedPosts = GetFollowedPosts; 