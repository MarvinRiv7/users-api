
import { Router } from "express";
import { buscar } from "./search.controller";

const router = Router()

router.get('/:coleccion/:termino', buscar)

export default router