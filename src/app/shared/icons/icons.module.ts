import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";

import {
  faSave,
  faEdit,
  faTrash,
  faPencil,
  faEyeSlash,
  faEye,
  faSearch,
  faArrowAltCircleLeft,
  faListUl,
  faTh,
  faUser,
  faClock,
  faEnvelope,
  faMobileAlt,
  faUpload,
  faBell,
  faCar,
  faFileArchive,
  faFile,
  faPrint,
  faPlus,
  faPen,
  faTimesCircle,
  faLocationArrow,
  faInfoCircle,
  faShoppingCart,
  faSignInAlt,
  faSignOut,
  faCheck,
  faLayerGroup,
  faHome,
  faUserFriends,
  faUsers,
  faInfo,
  faHeart,
  faWindowClose,
  faEllipsis,
  faComments
} from "@fortawesome/free-solid-svg-icons";

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSave,
      faEdit,
      faTrash,
      faPencil,
      faEyeSlash,
      faEye,
      faSearch,
      faArrowAltCircleLeft,
      faListUl,
      faTh,
      faUser,
      faClock,
      faEnvelope,
      faMobileAlt,
      faUpload,
      faBell,
      faCar,
      faFileArchive,
      faFile,
      faPrint,
      faPlus,
      faPen,
      faTimesCircle,
      faLocationArrow,
      faInfoCircle,
      faShoppingCart,
      faSignInAlt,
      faSignOut,
      faCheck,
      faLayerGroup,
      faHome,
      faUserFriends,
      faUsers,
      faInfo,
      faHeart,
      faWindowClose,
      faEllipsis,
      faComments


    );
  }
}
