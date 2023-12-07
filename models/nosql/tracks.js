const mongoose = require('mongoose');

/* Coleccion de Canciones */
const tracksScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validator: {
        validate: (request) => {
          return true;
        },
        message: 'ERROR_URL',
      }
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      }
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number
      }
    },
    mediaId: {
      type: mongoose.Types.ObjectId
    }
  },
  {
    /* createdAt, updatedAt */
    timestamps: true,
    versionKey: false
  }
);


/**
 * Implementar metodo propio con relacion a storage
 */
tracksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'audio'
      }
    },
    {
      $unwind: '$audio'
    }
  ]);
  return joinData

}
tracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      }
    },
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'audio'
      }
    },
    {
      $unwind: '$audio'
    }
  ]);
  return joinData
}


module.exports = mongoose.model('tracks', tracksScheme);