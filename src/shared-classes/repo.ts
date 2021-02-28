/** Manual repository representational object for proper display of the main information of the Github repos in the html
 * 
 * */
export class Repo{
    public name: string;
    public html_url: string;
    public url: string;
    public full_name: string;
  
    constructor(name: string, html_url: string, url: string, full_name: string){
      this.name = name;
      this.html_url = html_url;
      this.url = url;
      this.full_name = full_name;
    }
}