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
      position: 'top-end',
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }
  public static async operationConfirmed(message: string) : Promise<boolean>{
    const result = await Swal.fire({
      title: message,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    })
    return result.isConfirmed as boolean;
  }
}
