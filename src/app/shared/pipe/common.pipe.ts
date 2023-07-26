import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

// @Pipe({
//   name: 'common'
// })
// export class CommonPipe implements PipeTransform {

//   transform(value: any, args?: any): any {
//     return null;
//   }

// }



@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): any {
    if (!collection) {
      return null;
    }
    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current[property]]) {
        previous[current[property]] = [current];
      }
      else {
        previous[current[property]].push(current);
      }
      return previous;
    }, {});
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }
}


@Pipe({
  name: "sort"
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}


@Pipe({ name: 'niceTime' })
export class NiceTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const activationDate = this.getNowUTC();
      const seconds = Math.floor((+new Date(activationDate) - +new Date(value)) / 1000);
      if (seconds < 59) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals = {
        'year': 31536000,
        'month': 2630000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'sec': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ' + 'ago'; // singular (1 day )
          } else {
            return counter + ' ' + i + 's ' + 'ago'; // plural (2 days )
          }
        }
      }
    }
    return value;
  }
  private getNowUTC() {
    const now = new Date();
    return now.toJSON();
    //return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }
}


@Pipe({
  name: 'niceDateFormat'
})
export class NiceDateFormatPipe implements PipeTransform {
  transform(value) {
    const valueData = new Date(value)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (valueData.getFullYear() == today.getFullYear() && valueData.getMonth() == today.getMonth() && valueData.getDate() == today.getDate()) {
      const time = new Date(value);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);

      if (seconds < 60) {
        return 'just now';
      } else if (seconds < 3600) {
        return Math.floor(seconds / 60) + ' minutes ago';
      } else if (seconds < 86400) {
        return Math.floor(seconds / 3600) + ' hours ago';
      }
    }
    else if (valueData.getFullYear() == yesterday.getFullYear() && valueData.getMonth() == yesterday.getMonth() && valueData.getDate() == yesterday.getDate())
      return "Yesterday";
    else {
      return (new DatePipe("en-US")).transform(valueData, 'dd/MM/yyyy hh:mm:ss a');
    }
  }

}

