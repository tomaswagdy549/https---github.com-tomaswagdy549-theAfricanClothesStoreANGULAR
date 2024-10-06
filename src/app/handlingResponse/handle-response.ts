import Swal from 'sweetalert2';

export class HandleResponse {
  public static async handleSuccess(message: string) {
    const result = await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: true,
    });
  }
  public static handleError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'message',
    });
  }
}
