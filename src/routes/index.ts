import { Router } from "express";
import usuario from "./users";
const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
});

router.use('/usuario', usuario)

export default router;