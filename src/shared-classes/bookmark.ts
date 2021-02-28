import { Repo } from "./repo";
/** 
 * Created for the bookmarks bar. This object is saved inside the bookmark service, but inside the component are saved only strings containing the names of the repositories.
 * */
export class Bookmark{
    public name: string;
    public repo: Repo;

    constructor(name: string, repo: Repo){
        this.name = name;
        this.repo = repo;

    }
}