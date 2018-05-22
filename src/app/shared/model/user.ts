import { Address } from 'src/app/shared/model/address';
import { Company } from 'src/app/shared/model/company';
import { Posts } from 'src/app/shared/model/posts';
import { Albums } from 'src/app/shared/model/albums';
import { Photos } from 'src/app/shared/model/photos';

export class User {
    txtPesquisa: string;
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    ride: any;
    daysOfWeek: any;
    address: Address = new Address();
    company: Company = new Company();
    posts: Array<Posts> = new Array<Posts>();
    albums: Array<Albums> = new Array<Albums>();

    constructor() {
        this.ride = [];
        this.daysOfWeek = [];
    }
}
