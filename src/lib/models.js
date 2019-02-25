import { canonicalizeUrl } from './url.ts';

// In the future, use private fields instead:
//   https://github.com/tc39/proposal-class-fields
// I thought I could use symbols, but that didn't work out.
let modelAttrs = {};

class Model {
  constructor() {}

  async save() {
    // Does an update if the row already exists, otherwise does a put.
    let keyname = modelAttrs[this.constructor].key;
    let key = this[keyname];
    let table = modelAttrs[this.constructor].table;
    return table.add(this).catch(() => table.update(key, this));
  }

  put() {
    let table = modelAttrs[this.constructor].table;
    return table.put(this);
  }

  delete() {
    let key = this[modelAttrs[this.constructor].key];
    let table = modelAttrs[this.constructor].table;
    return table.delete(key);
  }
}

export class Activity extends Model {
  constructor(url, title, duration, creator_id) {
    super();
    this.url = canonicalizeUrl(url);
    this.title = cleanTitle(title);
    this.duration = duration;
    this.creator_id = creator_id;
  }
}

export class Creator extends Model {
  constructor(url, name, ignore = false) {
    super();
    if (typeof url !== 'string') {
      throw 'url was invalid type';
    }
    this.url = url;
    this.name = name;
    this.ignore = ignore;
  }
}

export class Donation {
  constructor(creator_id, weiAmount, usdAmount, transaction) {
    this.date = new Date().toISOString();
    this.creator_id = creator_id;
    this.weiAmount = weiAmount;
    this.usdAmount = usdAmount;
    this.transaction = transaction;
  }
}

export class Thank {
  constructor(url, title, creator_id) {
    this.url = canonicalizeUrl(url);
    this.date = new Date().toISOString();
    this.title = cleanTitle(title);
    this.creator_id = creator_id;
  }
}

export function registerModel(db, cls, table, key) {
  table.mapToClass(cls);
  modelAttrs[cls.prototype.constructor] = {
    table: table,
    key: key,
  };
}

function cleanTitle(title) {
  // Clean title from leading ({number}) as common for
  // notification counters on e.g. YouTube.
  if (title !== undefined) {
    return title.replace(/^\([0-9]+\)\s*/, '');
  }
}
