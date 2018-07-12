'use strict';

angular.module('taskManagerApp')
  .service('PermissionService', function () {
    var const_TakeInterview_Pos = 124;
    var const_Review_Pos = 234;
    var const_Reallocate_Pos = 678;
    var const_ManageWork_Pos = 45;

    this.binaryPermission = '';

    this.hexToBinary = function (hexString) {
      var index, ret = '';
      // lookup table for easier conversion. '0' characters are padded for '1' to '7'
      var lookupTable = {
        '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
        '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
        'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
        'e': '1110', 'f': '1111',
        'A': '1010', 'B': '1011', 'C': '1100', 'D': '1101',
        'E': '1110', 'F': '1111'
      };
      for (index = 0; index < hexString.length; index += 1) {
        if (lookupTable.hasOwnProperty(hexString[index])) {
          ret += lookupTable[hexString[index]];
        }
      }
      console.log(ret);
      return ret;
    }

    this.setPermission = function (hexPermission) {
      this.binaryPermission = this.hexToBinary(hexPermission);
    }

    this.hexToBin = function (hexString) {
      return this.hexToBinary(hexString);
    }

    this.hasPermission = function (permissionId, permissionBinString) {
      var length = permissionBinString.length;
      if (permissionBinString.charAt(permissionId - 1) == '1') {
        return true;
      } else {
        return false;
      }
    }

    this.canReview = function (permission) {
      var userPermission = permission;
      if (userPermission == undefined) {
        userPermission = this.binaryPermission;
      }
      return this.hasPermission(const_Review_Pos, userPermission);
    }

    this.canTakeInterview = function (permission) {
      var userPermission = permission;
      if (userPermission == undefined) {
        userPermission = this.binaryPermission;
      }
      return this.hasPermission(const_TakeInterview_Pos, userPermission);
    }

    this.canReallocate = function (permission) {
      var userPermission = permission;
      if (userPermission == undefined) {
        userPermission = this.binaryPermission;
      }
      return this.hasPermission(const_Reallocate_Pos, userPermission);
    }

    this.canManageWork = function (permission) {
      var userPermission = permission;
      if (userPermission == undefined) {
        userPermission = this.binaryPermission;
      }
      return this.hasPermission(const_ManageWork_Pos, userPermission);
    }

    this.getInterviewPermissionID = function  () {
     return const_TakeInterview_Pos ;
    }
  });
