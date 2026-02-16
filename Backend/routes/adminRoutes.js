import express from "express";
import { adminApproveAdvert, adminDeclineAdvert, deleteAllUsersAndRelatedData, deleteUserAndRelatedData, getAdminDashboardStats, getAllOwners, getAllPaymentsForAdmin, getAllUsers, getOwnerById, getUserAndRelatedData, verifyCompany } from "../controllers/adminController.js";
import { protect, adminOnly} from "../middlewares/auth.js";


const router = express.Router();

router.get("/owners/:id",  getOwnerById);
// All routes below are protected & admin-only
router.use(protect, adminOnly);

router.get("/dashboard",  getAdminDashboardStats);
router.get("/",  getAllUsers);
router.get("/owners",  getAllOwners);
router.get("/:userId/details", getUserAndRelatedData);
router.delete("/users/:userId", deleteUserAndRelatedData);
router.delete("/users", deleteAllUsersAndRelatedData);
router.put('/verify/:ownerId', verifyCompany);
router.put("/approve/:advertId",  adminApproveAdvert);
router.put("/decline/:advertId",adminDeclineAdvert);
router.get("/all-payments", protect, getAllPaymentsForAdmin);


export default router;