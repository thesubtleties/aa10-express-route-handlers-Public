// Phase 2
const { reset } = require("nodemon");
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId,
} = require("./data");

const express = require("express");
const app = express();

// Your code here
app.use(express.json());

app.get("/artists/latest/albums", async (req, res) => {
  const response = getAlbumsForLatestArtist();
  res.json(response);
});
app.get("/artists/latest", async (req, res) => {
  const response = getLatestArtist();
  res.json(response);
});
app.get("/artists/:artistId/albums", async (req, res) => {
  const artistId = req.params.artistId;
  const response = getAlbumsByArtistId(artistId);
  res.json(response);
});
app.post("/artists/:artistId/albums", async (req, res) => {
  const artistId = req.params.artistId;
  const data = req.body;
  const response = addAlbumByArtistId(artistId, data);
  res.status(201).json(response);
});
app.get("/artists/:artistId/songs", async (req, res) => {
  const artistId = req.params.artistId;
  const response = getSongsByArtistId(artistId);
  res.json(response);
});
app.get("/artists/:artistId", async (req, res) => {
  const artistId = req.params.artistId;
  const response = await getArtistByArtistId(artistId);
  res.json(response);
});
app.put("/artists/:artistId", async (req, res) => {
  const newName = req.body;
  const artistId = req.params.artistId;
  const response = await editArtistByArtistId(artistId, newName);
  res.json(response);
});

app.patch("/artists/:artistId", async (req, res) => {
  const newName = req.body;
  const artistId = req.params.artistId;
  const response = await editArtistByArtistId(artistId, newName);
  res.json(response);
});
app.delete("/artists/:artistId", async (req, res) => {
  const artistId = req.params.artistId;
  const response = deleteArtistByArtistId(artistId);
  res.json({
    message: "Successfully deleted",
  });
});
app.get("/artists", async (req, res) => {
  const artists = await getAllArtists();
  res.json(artists);
});

app.post("/artists", async (req, res) => {
  try {
    let data = req.body;
    let artist = await addArtist(data);
    res.status(201);
    res.json(artist);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error while adding artist.",
    });
  }
});
app.get("/albums/:albumId/songs", async (req, res) => {
  const albumId = req.params.albumId;
  const response = await getSongsByAlbumId(albumId);
  res.json(response);
});
app.post("/albums/:albumId/songs", async (req, res) => {
  const albumId = req.params.albumId;
  const data = req.body;
  const response = await addSongByAlbumId(albumId, data);
  res.status(201).json(response);

  res.json(response);
});
app.get("/albums/:albumId", async (req, res) => {
  const albumId = req.params.albumId;
  const response = await getAlbumByAlbumId(albumId);
  res.json(response);
});
app.put("/albums/:albumId", async (req, res) => {
  const data = req.body;
  const albumId = req.params.albumId;
  const response = await editAlbumByAlbumId(albumId, data);
  res.json(response);
});
app.patch("/albums/:albumId", async (req, res) => {
  const data = req.body;
  const albumId = req.params.albumId;
  const response = await editAlbumByAlbumId(albumId, data);
  res.json(response);
});
app.delete("/albums/:albumId", async (req, res) => {
  const albumId = req.params.albumId;
  const response = await deleteAlbumByAlbumId(albumId);
  res.json({
    message: "Successfully deleted",
  });
});
app.get("/albums", async (req, res) => {
  const startsWith = req.query.startsWith;
  const response = await getFilteredAlbums(startsWith.toUpperCase());
  res.json(response);
});

app.get("/songs/:songId", async (req, res) => {
  const songId = req.params.songId;
  const response = getSongBySongId(songId);
  res.json(response);
});
app.put("/songs/:songId", async (req, res) => {
  const songId = req.params.songId;
  const data = req.body;
  const response = await editSongBySongId(songId, data);
  res.json(response);
});
app.patch("/songs/:songId", async (req, res) => {
  const songId = req.params.songId;
  const data = req.body;
  const response = await editSongBySongId(songId, data);
  res.json(response);
});
app.delete("/songs/:songId", async (req, res) => {
  const songId = req.params.songId;
  deleteSongBySongId(songId);
  res.json({
    message: "Successfully deleted",
  });
});

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log("Server is listening on port", port));
} else {
  module.exports = app;
}
