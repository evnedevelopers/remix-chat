import { db } from '../db';

export class ProjectService {
  static findUserProjects(userId: number) {
    return db.query.projectsTable.findMany({
      with: {
        chats: true,
      }
    })
  }
}