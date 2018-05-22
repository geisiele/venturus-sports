import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';
import { Albums } from 'src/app/shared/model/albums';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  formUserList: FormGroup;

  constructor(
    private userService: UserService,
    formBuilder: FormBuilder
  ) {
    this.formUserList = formBuilder.group({
      filterUsers: ['', null]
    });

    // this.filterUsers.valueChanges.subscribe(val => {
    //   this.userService.lUser.filter(p => p.name.toLowerCase().startsWith(this.filterUsers.value.toLowerCase()) ||
    //   p.username.toLowerCase().startsWith(this.filterUsers.value.toLowerCase()));
    // });
  }


  getUsers() {
    this.userService.getUsers().subscribe(ret => {
      this.userService.lUser = ret.map(resp => {
        const aux = Object.assign({}, resp);
        aux.posts = [];
        aux.albums = [];
        return aux;
      });
    });
  }

  getPostsAndAlbuns(user: User) {
    let posts: any = [];
    let albums: any = [];
    let photos: any = [];
    this.userService.getPostsAndAlbuns(user.id).subscribe(
      data => {
        posts = data[0].json();
        albums = data[1].json();
        photos = data[2].json();
        albums.forEach(album => {
          album.photos = photos.filter(p => p.albumId == album.id)
        })
        user.posts = posts;
        user.albums = albums;
        
      }
    );
  }

  numberPhotos(user: User) {
    let retorno = 0;
    try {
      if (user.albums.length > 0) {
        user.albums.forEach(album => {
          retorno += album.photos.length;
        });
      }
    }
    catch{ }
    return retorno;
  }

  delete(user) {
    const userId = user.id;
    let index = this.userService.lUser.findIndex(x => x.id === userId)
    this.userService.lUser.splice(index, 1);
  }

  filter(lUser: Array<User>) {
    const teste = this.userService.lUser;
    return lUser.filter(p => p.name.toLowerCase().startsWith(this.filterUsers.value.toLowerCase()) ||
      p.username.toLowerCase().startsWith(this.filterUsers.value.toLowerCase()));
  }

  ngOnInit() {
    this.getUsers();
    setTimeout(() => {
      this.userService.lUser.forEach(user => {
        this.getPostsAndAlbuns(user);
      });

    });
  }

  get filterUsers() {
    return this.formUserList.get('filterUsers');
  }

}
