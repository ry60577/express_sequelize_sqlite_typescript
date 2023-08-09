import express, { Application, Request, Response } from 'express';
import 'reflect-metadata';
import router from './src/routes';

const POST = 9000;
const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', router);

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Sequelize Example 🤟' });
});

const start = async (): Promise<void> => {
  try {
    app.listen(POST, () => {
      console.log(`Server started on port ${POST}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
