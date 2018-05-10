export class User {
  Email: string;
  Name: string;
  Groups: string[];
}

var groups: string[] = ["admin", "administrator", "user", "devops"];

export class Administration {
  Users: Array<User> = [
    { Email: "kilgore@kilgore.trout", Name: "	Kilgore Trout", Groups: groups },
  ];

  Admins: Map<string, User>;

  constructor() {
    let map = new Map(); // new Map<string, User>();
    for (let user of this.Users) {
      let e = user.Email;
      map.set(user.Email, user);
    }
    this.Admins = map;
  }
}
