const errorHandler = require("../utils/errorHandler");
import { catchAsyncErrors } from '../middlewares/index';
import oracledb from 'oracledb';
import { dbConnection, database } from '../config/index';
import { getJWTToken } from '../models/index';
import { sendToken } from '../utils/index';

const errorMessage = "Something went wrong please try again.";
//login user
export const loginUser = catchAsyncErrors(async (req: any, res: any, next: any) => {
    const { requestData: { userID, password } } = req.body;
    //check if email and password is entered by user
    if (!userID) {
        return next(new errorHandler("Please enter UserID.", "99", "-99", "Data Validation Failed.", "Please enter UserID.", 400));
    }
    if (!password) {
        return next(new errorHandler("Please enter Password.", "99", "-99", "Data Validation Failed.", "Please enter Password.", 400));
    }
    let connection;
    let user: any;
    try {
        connection = await dbConnection(database);

        let query = `select
                    a.user_name as "userID",
                    a.description as "userName",
                    a.user_password as "userPassword",
                    a.user_level as "role",
                    a.def_comp_cd as "baseCompany",
                    a.def_branch_cd as "baseBranch",
                    a.active_flag as "activeFlag",
                    func_branch_nm(a.def_comp_cd,a.def_branch_cd) as "branchNM"
                    from security_users a
                    where lower(a.user_name) = :userid`;
        //@ts-ignore
        const result: any = await connection.execute(query, [userID.toLowerCase()]);
        const rows: any = result.rows;
        if (rows.length === 0) {
            return next(new errorHandler("UserId is not Valid.", "99", "-99", "Data Validation Failed.", "UserId is not Valid.", 400));
        }
        user = rows[0] ?? {};
        if (user?.activeFlag === 'N') {
            return next(new errorHandler("UserId is not Active.", "99", "-99", "Data Validation Failed.", "UserId is not Active.", 400));
        }
        let token = getJWTToken(userID);
        user = { ...user, token }
    } catch (err) {
        console.log(err);
        return next(new errorHandler("", "", "", "Database Connection Refused.", err, 400));
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return next(new errorHandler("", "", "", "Database Connection Refused.", err, 400));
            }
        };
    };
    return sendToken(user, 200, res);
});