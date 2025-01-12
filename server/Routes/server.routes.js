import express from 'express';
    import { ServerPage, ServerOnActivePage } from "../controllers/server.controllers.js";
    const router = express.Router();
    router.get("/", ServerPage);

    router.get("/ServerOnActivePage", ServerOnActivePage);
    export default router
