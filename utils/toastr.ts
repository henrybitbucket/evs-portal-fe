import toastr from 'toastr';

interface IToastrServiceProps {
  type: string;
  title?: string;
  message?: string;
  optionsOverride?: any;
}

class ToastrService {
  private toastr: any;

  constructor() {
    this.toastr = toastr;
    this.init();
  }

  show(
    type = 'info',
    message = 'Message',
    optionsOverride?: {}): IToastrServiceProps {
    if (this.toastr) {
      try {
        this.toastr[type](
          message,
          optionsOverride,
        );
      }
      catch(err) {}

      return;
    }
    throw new Error('Can not create toastr');
  }

  remove() {
    if (this.toastr) {
      this.toastr.remove();
      return;
    }
    throw new Error('Can not remove toastr');
  }

  init() {
    if (this.toastr) {
      const options = {
        preventDuplicates: true,
        newestOnTop: true,
        positionClass: 'toast-top-right',
      };
      this.toastr.options = options;
      return;
    }
    throw new Error('Can not init toastr');
  }
}

const toastrs = new ToastrService();
export { toastrs };
